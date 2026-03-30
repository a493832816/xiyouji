import { createMapTransformController } from "../scripts/map-controls.js";
import { legends, points, routePath, terrainPaths } from "../scripts/poi-data.js";
import { renderLegends, renderPois, renderRoute, renderTerrain } from "../scripts/map-renderer.js";
import { assert, test } from "./test-runner.js";

test("渲染层会生成热点、路径和图例", () => {
  const stage = document.createElement("div");
  const poiLayer = document.createElement("div");
  const routeLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const terrainLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const legendList = document.createElement("ul");

  stage.append(poiLayer, routeLayer, terrainLayer, legendList);

  renderPois(poiLayer, points.slice(0, 5));
  renderRoute(routeLayer, routePath.slice(0, 5));
  renderTerrain(terrainLayer, terrainPaths.slice(0, 2));
  renderLegends(legendList, legends);

  assert(poiLayer.querySelectorAll(".poi").length === 5, "热点数量应正确");
  assert(routeLayer.querySelectorAll("path").length >= 2, "路线层应至少包含 2 条路径");
  assert(terrainLayer.querySelectorAll("path").length === 2, "地形层路径数量应匹配");
  assert(legendList.querySelectorAll(".legend-item").length === legends.length, "图例项应完整渲染");
});

test("地图控制器支持缩放与复位", () => {
  const viewport = document.createElement("div");
  const stage = document.createElement("div");
  viewport.appendChild(stage);
  document.body.appendChild(viewport);

  Object.defineProperty(viewport, "getBoundingClientRect", {
    value: () => ({ width: 1000, height: 600, left: 0, top: 0 })
  });

  const controller = createMapTransformController({ viewport, stage });
  controller.zoomIn();
  const scaled = controller.getState().scale;
  assert(scaled > 1, "缩放后倍率应大于 1");
  controller.reset();
  const resetState = controller.getState();
  assert(resetState.scale === 1, "复位后倍率应为 1");
  assert(resetState.x === 0 && resetState.y === 0, "复位后位移应归零");
});
