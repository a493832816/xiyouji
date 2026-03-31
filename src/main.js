import { createMapTransformController } from "./map-controls.js";
import { factionZones, legends, mapMeta, points, routePath, routePathMarkers, terrainPaths } from "./poi-data.js";
import {
  renderMapLabels,
  renderFactionZones,
  renderLegends,
  renderPois,
  renderRoute,
  renderTerrain
} from "./map-renderer.js";
import { findPoiById, formatTooltipText } from "./map-utils.js";
import { renderCharacterPanel, clearCharacterPanel } from "./character-panel.js";

// 热加载模块（仅开发环境）
import './hot-reload.js';

console.log('[DEBUG] main.js 开始执行');
console.log('[DEBUG] points 数量:', points?.length);

const mapViewport = document.getElementById("map-viewport");
const mapStage = document.getElementById("map-stage");
const poiLayer = document.getElementById("poi-layer");
const routeLayer = document.getElementById("route-layer");
const terrainLayer = document.getElementById("terrain-layer");
const factionLayer = document.getElementById("faction-layer");
const labelLayer = document.getElementById("label-layer");
const tooltip = document.getElementById("poi-tooltip");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const resetButton = document.getElementById("zoom-reset");
const calibrateToggleButton = document.getElementById("calibrate-toggle");
const calibrateCopyButton = document.getElementById("calibrate-copy");
const calibrateStatus = document.getElementById("calibrate-status");

if (mapStage && mapViewport && poiLayer && routeLayer && terrainLayer && factionLayer && labelLayer && tooltip) {
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
  console.log('[DEBUG] POI 渲染完成, poiLayer 子元素数量:', poiLayer.children.length);

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

  // ========== 弹框相关代码 ==========

  let modalOverlay = null;
  let modalContent = null;

  function createModal() {
    if (modalOverlay) return;

    modalOverlay = document.createElement('div');
    modalOverlay.className = 'character-modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');

    modalContent = document.createElement('div');
    modalContent.className = 'character-modal-content';

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  async function openModal(point) {
    console.log('[DEBUG] openModal called with point:', point);
    if (!modalOverlay) createModal();

    modalContent.innerHTML = '';

    console.log('[DEBUG] characters:', point.characters);
    const closeBtn = await renderCharacterPanel(modalContent, point.characters || [], point.name);
    console.log('[DEBUG] closeBtn:', closeBtn);

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('[DEBUG] modal shown');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      clearCharacterPanel(modalContent);
    }
  }

  // ========== POI 交互 ==========

  function clearActivePoi() {
    document.querySelectorAll(".poi.active").forEach((poi) => poi.classList.remove("active"));
  }

  function activatePoi(point) {
    clearActivePoi();
    const poiNode = poiLayer.querySelector(`[data-poi-id="${point.id}"]`);
    poiNode?.classList.add("active");
    openModal(point);
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
    if (!target) return;
    const point = findPoiById(points, target.dataset.poiId);
    if (point) showTooltip(event, point);
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
    if (!target) return;
    const point = findPoiById(points, target.dataset.poiId);
    if (point) showTooltip(event, point);
  });

  poiLayer.addEventListener("pointerout", hideTooltip);

  poiLayer.addEventListener("pointerdown", (event) => {
    if (!calibrating) return;
    const target = event.target.closest(".poi");
    if (!target) return;
    draggingPoi = target;
    draggingPointerId = event.pointerId;
    draggingPoi.classList.add("dragging");
    draggingPoi.setPointerCapture(event.pointerId);
    hideTooltip();
    event.preventDefault();
    event.stopPropagation();
  });

  poiLayer.addEventListener("pointerup", (event) => {
    if (!draggingPoi || event.pointerId !== draggingPointerId) return;
    draggingPoi.classList.remove("dragging");
    draggingPoi = null;
    draggingPointerId = null;
  });

  // 直接给每个 POI 按钮添加点击监听
  function attachPoiClickListeners() {
    const poiButtons = poiLayer.querySelectorAll('.poi');
    console.log('[DEBUG] 找到 POI 按钮数量:', poiButtons.length);
    poiButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        console.log('[DEBUG] 直接点击 POI 按钮:', btn.dataset.poiId);
        if (calibrating) {
          event.preventDefault();
          return;
        }
        const poiId = btn.dataset.poiId;
        const point = findPoiById(points, poiId);
        if (!point) return;
        activatePoi(point);
        controller.centerOnPoint(point);
        location.hash = `poi-${point.id}`;
      });
    });
  }

  attachPoiClickListeners();

  // 初始化时如果有 hash，打开对应的弹框
  const hashId = decodeURIComponent(location.hash || "").replace("#poi-", "");
  const initialPoi = findPoiById(points, hashId);
  if (initialPoi) {
    setTimeout(() => {
      activatePoi(initialPoi);
    }, 300);
  }
}
