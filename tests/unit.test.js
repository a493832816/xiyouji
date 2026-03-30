import { points, routePath } from "../scripts/poi-data.js";
import { clamp, findPoiById, formatTooltipText, pathFromPoints } from "../scripts/map-utils.js";
import { assert, test } from "./test-runner.js";

test("clamp 在边界内返回原值", () => {
  assert(clamp(2, 1, 4) === 2, "clamp 应返回 2");
});

test("clamp 在边界外返回最接近边界", () => {
  assert(clamp(8, 1, 4) === 4, "clamp 应返回上限 4");
  assert(clamp(-2, 1, 4) === 1, "clamp 应返回下限 1");
});

test("pathFromPoints 生成可用 SVG 路径", () => {
  const d = pathFromPoints(routePath.slice(0, 3));
  assert(d.startsWith("M"), "路径应以 M 开头");
  assert(d.includes("L"), "路径应包含折线命令 L");
});

test("findPoiById 可以通过 id 定位热点", () => {
  const poi = findPoiById(points, "changan");
  assert(Boolean(poi), "应找到长安热点");
  assert(poi.name === "长安", "热点名称应为长安");
});

test("formatTooltipText 输出地区文本", () => {
  const poi = findPoiById(points, "huaguo");
  const text = formatTooltipText(poi);
  assert(text.includes("花果山"), "提示文本应包含地点名");
  assert(text.includes("东胜神州"), "提示文本应包含地区名");
});
