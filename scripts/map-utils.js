export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function pathFromPoints(points) {
  if (!points.length) {
    return "";
  }
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

export function findPoiById(points, id) {
  return points.find((point) => point.id === id);
}

export function getScaleToPoint(viewportRect, point, targetScale) {
  const centerX = viewportRect.width / 2;
  const centerY = viewportRect.height / 2;
  return {
    x: centerX - (point.x / 100) * viewportRect.width * targetScale,
    y: centerY - (point.y / 100) * viewportRect.height * targetScale
  };
}

export function formatTooltipText(point) {
  return `${point.name} · ${point.region}`;
}
