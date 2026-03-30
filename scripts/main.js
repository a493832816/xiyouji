import { createMapTransformController } from "./map-controls.js";
import { factionZones, legends, mapMeta, points, routePath, routePathMarkers, terrainPaths } from "./poi-data.js";
import {
  renderDetailList,
  renderFactionZones,
  renderLegends,
  renderMapLabels,
  renderPois,
  renderRoute,
  renderTerrain
} from "./map-renderer.js";
import { findPoiById, formatTooltipText } from "./map-utils.js";
import { renderCharacterPanel, clearCharacterPanel } from "./character-panel.js";

const mapViewport = document.getElementById("map-viewport");
const mapStage = document.getElementById("map-stage");
const poiLayer = document.getElementById("poi-layer");
const routeLayer = document.getElementById("route-layer");
const terrainLayer = document.getElementById("terrain-layer");
const factionLayer = document.getElementById("faction-layer");
const labelLayer = document.getElementById("label-layer");
const legendList = document.getElementById("legend-list");
const detailsList = document.getElementById("poi-details");
const tooltip = document.getElementById("poi-tooltip");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const resetButton = document.getElementById("zoom-reset");
const calibrateToggleButton = document.getElementById("calibrate-toggle");
const calibrateCopyButton = document.getElementById("calibrate-copy");
const calibrateStatus = document.getElementById("calibrate-status");

if (mapStage && mapViewport && poiLayer && routeLayer && terrainLayer && factionLayer && labelLayer && legendList && detailsList && tooltip) {
  const baseImage = document.getElementById("map-base-image");
  if (baseImage) {
    baseImage.src = mapMeta.imagePath;
    baseImage.alt = mapMeta.title;
    baseImage.addEventListener("load", () => {
      if (baseImage.naturalWidth && baseImage.naturalHeight) {
        mapViewport.style.aspectRatio = `${baseImage.naturalWidth} / ${baseImage.naturalHeight}`;
      }
    });
  }

  renderMapLabels(labelLayer, mapMeta);
  renderFactionZones(factionLayer, factionZones);
  renderTerrain(terrainLayer, terrainPaths);
  renderRoute(routeLayer, routePath, routePathMarkers);
  renderPois(poiLayer, points);
  renderLegends(legendList, legends);
  renderDetailList(detailsList, points);

  const controller = createMapTransformController({
    viewport: mapViewport,
    stage: mapStage
  });
  let calibrating = false;
  let draggingPoi = null;
  let draggingPointerId = null;
  let lastEditedPoi = null;

  zoomInButton?.addEventListener("click", () => controller.zoomIn());
  zoomOutButton?.addEventListener("click", () => controller.zoomOut());
  resetButton?.addEventListener("click", () => controller.reset());

  function formatPoiPatch(point) {
    return `{ id: "${point.id}", name: "${point.name}", x: ${point.x.toFixed(2)}, y: ${point.y.toFixed(2)}, t: "${point.t}" }`;
  }

  function updateCalibrateStatus(text) {
    if (calibrateStatus) {
      calibrateStatus.textContent = text;
    }
  }

  function setCalibrateMode(enabled) {
    calibrating = enabled;
    mapViewport.classList.toggle("calibrating", enabled);
    calibrateToggleButton?.classList.toggle("active", enabled);
    if (calibrateToggleButton) {
      calibrateToggleButton.textContent = enabled ? "关闭校准" : "开启校准";
    }
    if (enabled) {
      updateCalibrateStatus("校准模式已开启：拖动地点标签可实时更新坐标");
      controller.reset();
    } else {
      updateCalibrateStatus("校准模式关闭");
      if (draggingPoi) {
        draggingPoi.classList.remove("dragging");
      }
      draggingPoi = null;
      draggingPointerId = null;
    }
  }

  async function copyLastPoiPosition() {
    if (!lastEditedPoi) {
      updateCalibrateStatus("还没有拖动过地点，先拖一个再复制");
      return;
    }
    const text = formatPoiPatch(lastEditedPoi);
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      updateCalibrateStatus(`已复制：${text}`);
      return;
    }
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    updateCalibrateStatus(`已复制：${text}`);
  }

  calibrateToggleButton?.addEventListener("click", () => {
    setCalibrateMode(!calibrating);
  });

  calibrateCopyButton?.addEventListener("click", () => {
    copyLastPoiPosition();
  });

  // 保存原始详情的函数，以便从人物面板返回
  let originalDetail = null;

  function clearActivePoi() {
    document.querySelectorAll(".poi.active").forEach((poi) => poi.classList.remove("active"));
    document.querySelectorAll(".poi-detail.active").forEach((detail) => detail.classList.remove("active"));
  }

  function restoreOriginalDetail() {
    clearCharacterPanel(detailsList);
    if (originalDetail) {
      originalDetail.classList.add("active");
      originalDetail.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  function activatePoi(point) {
    clearActivePoi();
    clearCharacterPanel(detailsList);
    originalDetail = null;

    const poiNode = poiLayer.querySelector(`[data-poi-id="${point.id}"]`);
    const detailNode = document.getElementById(`poi-${point.id}`);
    poiNode?.classList.add("active");
    
    // 检查是否有 characters 数据
    if (point.characters && point.characters.length > 0) {
      // 显示人物面板
      const closeBtn = renderCharacterPanel(detailsList, point.characters, point.name);
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          restoreOriginalDetail();
        });
      }
    } else {
      // 没有 characters 数据，保持原有行为
      detailNode?.classList.add("active");
      originalDetail = detailNode;
      detailNode?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  function showTooltip(event, point) {
    const rect = mapViewport.getBoundingClientRect();
    tooltip.textContent = formatTooltipText(point);
    tooltip.hidden = false;
    tooltip.style.left = `${event.clientX - rect.left + 12}px`;
    tooltip.style.top = `${event.clientY - rect.top + 12}px`;
  }

  function hideTooltip() {
    tooltip.hidden = true;
  }

  poiLayer.addEventListener("pointerover", (event) => {
    const target = event.target.closest(".poi");
    if (!target) {
      return;
    }
    const point = findPoiById(points, target.dataset.poiId);
    if (point) {
      showTooltip(event, point);
    }
  });

  poiLayer.addEventListener("pointermove", (event) => {
    if (calibrating && draggingPoi && event.pointerId === draggingPointerId) {
      const rect = mapStage.getBoundingClientRect();
      const nextX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const nextY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
      draggingPoi.style.left = `${nextX}%`;
      draggingPoi.style.top = `${nextY}%`;
      const point = findPoiById(points, draggingPoi.dataset.poiId);
      if (point) {
        point.x = Number(nextX.toFixed(2));
        point.y = Number(nextY.toFixed(2));
        lastEditedPoi = point;
        updateCalibrateStatus(`正在校准：${formatPoiPatch(point)}`);
      }
      return;
    }
    const target = event.target.closest(".poi");
    if (!target) {
      return;
    }
    const point = findPoiById(points, target.dataset.poiId);
    if (point) {
      showTooltip(event, point);
    }
  });

  poiLayer.addEventListener("pointerout", hideTooltip);

  poiLayer.addEventListener("pointerdown", (event) => {
    if (!calibrating) {
      return;
    }
    const target = event.target.closest(".poi");
    if (!target) {
      return;
    }
    draggingPoi = target;
    draggingPointerId = event.pointerId;
    draggingPoi.classList.add("dragging");
    draggingPoi.setPointerCapture(event.pointerId);
    hideTooltip();
    event.preventDefault();
    event.stopPropagation();
  });

  poiLayer.addEventListener("pointerup", (event) => {
    if (!draggingPoi || event.pointerId !== draggingPointerId) {
      return;
    }
    draggingPoi.classList.remove("dragging");
    draggingPoi = null;
    draggingPointerId = null;
  });

  poiLayer.addEventListener("click", (event) => {
    if (calibrating) {
      event.preventDefault();
      return;
    }
    const target = event.target.closest(".poi");
    if (!target) {
      return;
    }
    const point = findPoiById(points, target.dataset.poiId);
    if (!point) {
      return;
    }
    activatePoi(point);
    controller.centerOnPoint(point);
    location.hash = `poi-${point.id}`;
  });

  detailsList.addEventListener("click", (event) => {
    const card = event.target.closest(".poi-detail");
    if (!card) {
      return;
    }
    const point = findPoiById(points, card.dataset.poiId);
    if (!point) {
      return;
    }
    activatePoi(point);
    controller.centerOnPoint(point);
  });

  const hashId = decodeURIComponent(location.hash || "").replace("#poi-", "");
  const initialPoi = findPoiById(points, hashId) || points[0];
  if (initialPoi) {
    activatePoi(initialPoi);
  }
}
