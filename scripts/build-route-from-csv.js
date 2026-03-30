/**
 * 从 route-path.csv 生成 poi-data 可用的 routePathRaw 片段（仅打印，供粘贴或后续自动化）
 * 用法：node scripts/build-route-from-csv.js
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, "..", "route-path.csv");

const raw = readFileSync(csvPath, "utf8");
const lines = raw.trim().split(/\r?\n/).filter(Boolean);
const header = lines.shift();
if (!header.includes("order")) {
  throw new Error("CSV 缺少表头");
}

const rows = [];
for (const line of lines) {
  const [order, row, direction, name, x, y, poiId] = line.split(",").map((s) => s.trim());
  rows.push({
    order: Number(order),
    row: Number(row),
    direction,
    name,
    x: Number(x),
    y: Number(y),
    poiId: poiId || ""
  });
}

const js = rows.map((r) => {
  const parts = [`x: ${r.x}`, `y: ${r.y}`, `name: "${r.name.replace(/"/g, '\\"')}"`];
  if (r.poiId) {
    parts.push(`poiId: "${r.poiId}"`);
  }
  return `  { ${parts.join(", ")} }`;
});

console.log("// 粘贴到 poi-data.js 的 routePathRaw 数组：\n");
console.log(`const routePathRaw = [\n${js.join(",\n")}\n];`);
