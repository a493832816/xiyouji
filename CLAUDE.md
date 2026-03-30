# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive map visualization of "Journey to the West" (西游记), featuring zoom/pan controls, POI (Point of Interest) markers, route paths, terrain layers, and character information panels. The project is a pure frontend application with no build step.

## Commands

### Running the Application
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```
Then open `http://localhost:8080/index.html`

### Running Tests
Open `http://localhost:8080/tests/run-tests.html` in a browser after starting a local server.

### Building Route Data from CSV
```bash
node scripts/build-route-from-csv.js
```
This outputs JavaScript code to paste into `scripts/poi-data.js` for the `routePathRaw` array.

## Architecture

### Core Modules (scripts/)

| File | Purpose |
|------|---------|
| `poi-data.js` | Single source of truth for all map data: `points` (POIs), `routePath`, `terrainPaths`, `factionZones`, `legends`, `mapMeta`. Edit this to add/modify locations or routes. |
| `map-renderer.js` | Pure rendering functions for SVG/DOM elements. Each export creates specific layer content (POIs, routes, terrain, factions, labels, legends, detail list). |
| `map-controls.js` | `createMapTransformController()` returns zoom/pan/reset/centerOnPoint methods. Handles wheel zoom and pointer drag. |
| `map-utils.js` | Small utility functions: `clamp`, `pathFromPoints`, `findPoiById`, `getScaleToPoint`, `formatTooltipText`. |
| `main.js` | Entry point. Initializes all layers, binds events for POI hover/click/drag (calibration mode), and wires toolbar buttons. |
| `character-panel.js` | Renders expandable character info panels grouped by rank when a POI has `characters` data. |

### Data Flow

1. `poi-data.js` exports static data structures
2. `main.js` imports data and calls `render*` functions from `map-renderer.js`
3. Each renderer populates a specific DOM layer (`#poi-layer`, `#route-layer`, etc.)
4. `map-controls.js` manages transform state (scale, translate) applied to `#map-stage`

### Layer Stack (in map viewport)

```
#map-stage (transformed container)
  ├── #map-base-image (底图 JPG)
  ├── #terrain-layer (SVG: 山脉/水系)
  ├── #route-layer (SVG: 取经路线)
  ├── #label-layer (区域名称)
  ├── #faction-layer (势力范围)
  └── #poi-layer (热点按钮)
```

### POI Data Structure

Each point in `points` array has:
- `id`: unique identifier (used for hash navigation)
- `name`: display name
- `x`, `y`: position as percentage (0-100)
- `t`: type (`city`, `mountain`, `temple`, `water`)
- `region`: area name for tooltip
- `desc`: description for detail panel
- `big`: optional boolean for larger marker
- `characters`: optional array of character names (shows character panel on click)

### Calibration Mode

The app includes a built-in POI position calibration tool:
1. Click "开启校准" button
2. Drag any POI marker to adjust its coordinates
3. Click "复制坐标" to copy the updated position snippet
4. Paste into `poi-data.js`

## Testing

Tests use a minimal custom framework (`tests/test-runner.js`) with `test()` and `assert()` functions. Tests are browser-based and run via `run-tests.html`. No Node.js test runner.
