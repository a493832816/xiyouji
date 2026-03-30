import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, "..", "route-path.csv");
const raw = readFileSync(csvPath, "utf8");
const lines = raw.trim().split(/\r?\n/).slice(1).filter(Boolean);

const items = lines.map((line) => {
  const [order, row, dir, name, x, y, poiId] = line.split(",").map((s) => s.trim());
  const parts = [`x: ${x}`, `y: ${y}`, `name: ${JSON.stringify(name)}`];
  if (poiId) {
    parts.push(`poiId: ${JSON.stringify(poiId)}`);
  }
  return `  { ${parts.join(", ")} }`;
});

const out = `const routePathRaw = [\n${items.join(",\n")}\n];\n`;
writeFileSync(join(__dirname, "..", "route-path-raw.snippet.js"), out, "utf8");
console.log("ok", items.length);
