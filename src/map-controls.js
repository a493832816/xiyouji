import { clamp, getScaleToPoint } from "./map-utils.js";

const SCALE_MIN = 1;
const SCALE_MAX = 4;
const SCALE_STEP = 0.2;

export function createMapTransformController({ viewport, stage }) {
  const state = {
    scale: 1,
    x: 0,
    y: 0,
    dragging: false,
    pointerId: null,
    startX: 0,
    startY: 0
  };

  function applyTransform() {
    stage.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
  }

  function getBounds(scale = state.scale) {
    const rect = viewport.getBoundingClientRect();
    const width = rect.width * scale;
    const height = rect.height * scale;
    const minX = Math.min(0, rect.width - width);
    const minY = Math.min(0, rect.height - height);
    return { minX, minY, maxX: 0, maxY: 0, rect };
  }

  function constrainPosition() {
    const bounds = getBounds();
    state.x = clamp(state.x, bounds.minX, bounds.maxX);
    state.y = clamp(state.y, bounds.minY, bounds.maxY);
    applyTransform();
  }

  function zoomTo(targetScale, center) {
    const nextScale = clamp(targetScale, SCALE_MIN, SCALE_MAX);
    if (nextScale === state.scale) {
      return;
    }
    const bounds = getBounds(nextScale);
    const focusX = center?.x ?? bounds.rect.width / 2;
    const focusY = center?.y ?? bounds.rect.height / 2;
    const ratio = nextScale / state.scale;
    state.x = focusX - (focusX - state.x) * ratio;
    state.y = focusY - (focusY - state.y) * ratio;
    state.scale = nextScale;
    constrainPosition();
  }

  function centerOnPoint(point) {
    const bounds = getBounds(state.scale);
    const coords = getScaleToPoint(bounds.rect, point, state.scale);
    state.x = coords.x;
    state.y = coords.y;
    constrainPosition();
  }

  function reset() {
    state.scale = 1;
    state.x = 0;
    state.y = 0;
    applyTransform();
  }

  viewport.addEventListener("wheel", (event) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    const targetScale = state.scale + direction * SCALE_STEP;
    const rect = viewport.getBoundingClientRect();
    zoomTo(targetScale, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  }, { passive: false });

  viewport.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }
    // 如果 clicking on a POI button, don't capture pointer
    const target = event.target.closest('.poi');
    if (target) {
      return; // 不捕获指针，让 click 事件正常触发
    }
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.startX = event.clientX - state.x;
    state.startY = event.clientY - state.y;
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!state.dragging || event.pointerId !== state.pointerId) {
      return;
    }
    state.x = event.clientX - state.startX;
    state.y = event.clientY - state.startY;
    constrainPosition();
  });

  function finishDrag(event) {
    if (event.pointerId !== state.pointerId) {
      return;
    }
    state.dragging = false;
    state.pointerId = null;
  }

  viewport.addEventListener("pointerup", finishDrag);
  viewport.addEventListener("pointercancel", finishDrag);
  viewport.addEventListener("pointerleave", finishDrag);

  applyTransform();

  return {
    zoomIn() {
      zoomTo(state.scale + SCALE_STEP);
    },
    zoomOut() {
      zoomTo(state.scale - SCALE_STEP);
    },
    reset,
    centerOnPoint,
    getState() {
      return { ...state };
    }
  };
}
