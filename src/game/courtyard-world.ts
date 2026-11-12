export const WORLD = {
  width: 1672,
  height: 941,
  floor: {
    top: 260,
    shoulders: 335,
    bottom: 912,
    topLeft: 560,
    topRight: 1112,
  },
  depthScale: { far: 0.72, near: 1 },
} as const;

export function getCourtyardBoundsAt(y: number) {
  const floor = WORLD.floor;
  const clampedY = Math.max(floor.top, Math.min(floor.bottom, y));
  const progress = Math.max(
    0,
    Math.min(1, (clampedY - floor.top) / (floor.shoulders - floor.top)),
  );
  return {
    left: floor.topLeft * (1 - progress),
    right: WORLD.width - (WORLD.width - floor.topRight) * (1 - progress),
  };
}

export function isInsideCourtyard(x: number, y: number) {
  if (y < WORLD.floor.top || y > WORLD.floor.bottom) return false;
  const bounds = getCourtyardBoundsAt(y);
  return x >= bounds.left && x <= bounds.right;
}

export function getCourtyardDepth(y: number) {
  return Math.round(Math.max(0, Math.min(WORLD.height, y)));
}

export function getCourtyardCharacterScale(y: number) {
  const { top, bottom } = WORLD.floor;
  const progress = Math.max(0, Math.min(1, (y - top) / (bottom - top)));
  return WORLD.depthScale.far + progress * (WORLD.depthScale.near - WORLD.depthScale.far);
}