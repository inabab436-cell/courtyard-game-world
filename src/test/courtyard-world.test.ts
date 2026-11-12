import { describe, expect, it } from "vitest";
import {
  getCourtyardBoundsAt,
  getCourtyardCameraZoom,
  getCourtyardCharacterScale,
  getCourtyardDepth,
  isInsideCourtyard,
  WORLD,
} from "@/game/courtyard-world";

describe("courtyard world coordinates", () => {
  it("fits the complete courtyard in landscape viewports", () => {
    expect(getCourtyardCameraZoom(844, 390)).toBe(390 / WORLD.height);
  });

  it("keeps the walkable floor inside its perspective boundaries", () => {
    expect(isInsideCourtyard(800, WORLD.floor.top)).toBe(true);
    expect(isInsideCourtyard(100, WORLD.floor.top)).toBe(false);
    expect(isInsideCourtyard(0, WORLD.floor.shoulders)).toBe(true);
    expect(isInsideCourtyard(0, WORLD.floor.bottom)).toBe(true);
    expect(isInsideCourtyard(800, WORLD.floor.bottom + 1)).toBe(false);
  });

  it("widens the walkable floor toward the camera", () => {
    const distant = getCourtyardBoundsAt(WORLD.floor.top);
    const near = getCourtyardBoundsAt(WORLD.floor.shoulders);
    expect(distant.left).toBe(WORLD.floor.topLeft);
    expect(distant.right).toBe(WORLD.floor.topRight);
    expect(near.left).toBe(0);
    expect(near.right).toBe(WORLD.width);
  });

  it("orders characters by floor position and scales nearer characters larger", () => {
    expect(getCourtyardDepth(700)).toBeGreaterThan(getCourtyardDepth(400));
    expect(getCourtyardCharacterScale(WORLD.floor.top)).toBe(WORLD.depthScale.far);
    expect(getCourtyardCharacterScale(WORLD.floor.bottom)).toBe(WORLD.depthScale.near);
  });
});