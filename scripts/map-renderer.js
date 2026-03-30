import { pathFromPoints } from "./map-utils.js";

const SVG_NS = "http://www.w3.org/2000/svg";

function createPoiElement(point) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `poi ${point.t}${point.big ? " large" : ""}`;
  button.textContent = point.name;
  button.style.left = `${point.x}%`;
  button.style.top = `${point.y}%`;
  button.dataset.poiId = point.id;
  button.dataset.poiType = point.t;
  button.dataset.poiName = point.name;
  button.dataset.poiDesc = point.desc;
  button.dataset.poiRegion = point.region;
  return button;
}

export function renderPois(layerElement, points) {
  layerElement.innerHTML = "";
  const fragment = document.createDocumentFragment();
  points.forEach((point) => {
    fragment.appendChild(createPoiElement(point));
  });
  layerElement.appendChild(fragment);
}

/**
 * @param routeGeometry 折线顶点序列（可与 CSV 中全部节点一致，保证路径形状）
 * @param routeMarkers 可选；用于路线圆点；不传则与 routeGeometry 相同
 */
export function renderRoute(routeLayer, routeGeometry, routeMarkers) {
  routeLayer.innerHTML = "";
  if (!routeGeometry.length) {
    return;
  }
  routeLayer.setAttribute("viewBox", "0 0 100 100");
  routeLayer.setAttribute("preserveAspectRatio", "none");

  const pathD = pathFromPoints(routeGeometry);
  const glowPath = document.createElementNS(SVG_NS, "path");
  glowPath.setAttribute("class", "route-main-glow");
  glowPath.setAttribute("d", pathD);

  const mainPath = document.createElementNS(SVG_NS, "path");
  mainPath.setAttribute("class", "route-main");
  mainPath.setAttribute("d", pathD);

  const markerSource = routeMarkers ?? routeGeometry;
  const markers = markerSource.filter((point) => point.name);
  const markerGroup = document.createElementNS(SVG_NS, "g");
  markerGroup.setAttribute("class", "route-markers");
  markers.forEach((point) => {
    const marker = document.createElementNS(SVG_NS, "circle");
    marker.setAttribute("class", "route-marker");
    marker.setAttribute("cx", String(point.x));
    marker.setAttribute("cy", String(point.y));
    marker.setAttribute("r", "0.55");
    marker.dataset.poiId = point.poiId || "";
    markerGroup.appendChild(marker);
  });

  routeLayer.append(glowPath, mainPath, markerGroup);
}

export function renderTerrain(terrainLayer, terrainPaths) {
  terrainLayer.innerHTML = "";
  terrainLayer.setAttribute("viewBox", "0 0 100 100");
  terrainLayer.setAttribute("preserveAspectRatio", "none");
  terrainPaths.forEach((pathInfo) => {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("class", pathInfo.cls);
    path.setAttribute("d", pathInfo.d);
    terrainLayer.appendChild(path);
  });
}

function createFactionZone(zone) {
  const zoneElement = document.createElement("div");
  zoneElement.className = `faction-zone ${zone.cls}`;
  zoneElement.style.left = `${zone.x}%`;
  zoneElement.style.top = `${zone.y}%`;
  zoneElement.style.width = `${zone.w}%`;
  zoneElement.style.height = `${zone.h}%`;
  zoneElement.style.transform = `rotate(${zone.rotate}deg)`;
  const label = document.createElement("div");
  label.className = "faction-label";
  label.textContent = zone.name;
  zoneElement.appendChild(label);
  return zoneElement;
}

export function renderFactionZones(layerElement, factionZones) {
  layerElement.innerHTML = "";
  const fragment = document.createDocumentFragment();
  factionZones.forEach((zone) => {
    fragment.appendChild(createFactionZone(zone));
  });
  layerElement.appendChild(fragment);
}

export function renderMapLabels(layerElement, mapMeta) {
  layerElement.innerHTML = "";
  const fragment = document.createDocumentFragment();
  mapMeta.regionLabels.forEach((label) => {
    const el = document.createElement("div");
    el.className = `region-label region-${label.cls}`;
    el.textContent = label.name;
    el.style.left = `${label.x}%`;
    el.style.top = `${label.y}%`;
    fragment.appendChild(el);
  });

  mapMeta.waterLabels.forEach((label) => {
    const el = document.createElement("div");
    el.className = "water-text";
    el.textContent = label.name;
    el.style.left = `${label.x}%`;
    el.style.top = `${label.y}%`;
    el.style.transform = `translate(-50%, -50%) rotate(${label.rotate}deg)`;
    fragment.appendChild(el);
  });
  layerElement.appendChild(fragment);
}

export function renderLegends(container, legends) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  legends.forEach((legend) => {
    const item = document.createElement("li");
    item.className = "legend-item";
    item.innerHTML = `<span class="legend-dot" style="--legend-color:${legend.color}"></span><span>${legend.label}</span>`;
    fragment.appendChild(item);
  });
  container.appendChild(fragment);
}

export function renderDetailList(container, points) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  points.forEach((point) => {
    const card = document.createElement("article");
    card.id = `poi-${point.id}`;
    card.className = "poi-detail";
    card.dataset.poiId = point.id;
    card.innerHTML = `
      <h3>${point.name}</h3>
      <p>${point.desc}</p>
      <p class="poi-detail-meta">${point.region} · ${point.t}</p>
    `;
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}
