import Phaser from "phaser";
import courtyardArtwork from "@/assets/moonlit-courtyard.png.asset.json";
import {
  getCourtyardBoundsAt,
  getCourtyardCharacterScale,
  getCourtyardDepth,
  isInsideCourtyard,
  WORLD,
} from "./courtyard-world";

export class CourtyardScene extends Phaser.Scene {
  private environment?: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "courtyard" });
  }

  preload() {
    this.load.image("courtyard-environment", courtyardArtwork.url);
  }

  create() {
    this.environment = this.add
      .image(WORLD.width / 2, WORLD.height / 2, "courtyard-environment")
      .setOrigin(0.5)
      .setDisplaySize(WORLD.width, WORLD.height)
      .setDepth(0);

    const actors = this.add.layer().setDepth(10);
    const floorBoundary = new Phaser.Geom.Polygon([
      new Phaser.Geom.Point(WORLD.floor.topLeft, WORLD.floor.top),
      new Phaser.Geom.Point(WORLD.floor.topRight, WORLD.floor.top),
      new Phaser.Geom.Point(WORLD.width, WORLD.floor.shoulders),
      new Phaser.Geom.Point(WORLD.width, WORLD.floor.bottom),
      new Phaser.Geom.Point(0, WORLD.floor.bottom),
      new Phaser.Geom.Point(0, WORLD.floor.shoulders),
    ]);

    // Future movement and character systems can use the shared world geometry and render layer.
    this.physics.world.setBounds(0, 0, WORLD.width, WORLD.height);
    this.registry.set("courtyard", {
      world: WORLD,
      floorBoundary,
      isInside: isInsideCourtyard,
      boundsAt: getCourtyardBoundsAt,
      depthAt: getCourtyardDepth,
      characterScaleAt: getCourtyardCharacterScale,
      actors,
    });

    this.scale.on(Phaser.Scale.Events.RESIZE, this.layoutEnvironment, this);
    this.layoutEnvironment();
  }

  private layoutEnvironment() {
    if (!this.environment) return;

    // Camera zoom fills portrait viewports without changing the artwork's world-space dimensions.
    const zoom = Math.max(this.scale.width / WORLD.width, this.scale.height / WORLD.height);
    this.environment.setScale(1).setPosition(WORLD.width / 2, WORLD.height / 2);

    const camera = this.cameras.main;
    camera.setViewport(0, 0, this.scale.width, this.scale.height);
    camera.setBounds(0, 0, WORLD.width, WORLD.height);
    camera.setZoom(zoom);
    camera.centerOn(WORLD.width / 2, WORLD.height / 2);
  }
}

export function createCourtyardGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.CANVAS,
    parent,
    width: WORLD.width,
    height: WORLD.height,
    backgroundColor: "#201c39",
    render: {
      antialias: true,
      pixelArt: false,
      roundPixels: true,
      powerPreference: "low-power",
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: WORLD.width,
      height: WORLD.height,
    },
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [CourtyardScene],
    banner: false,
    audio: { noAudio: true },
    input: { activePointers: 1 },
  });
}