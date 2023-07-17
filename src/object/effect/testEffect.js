import { Entity } from "playcanvas";
import { Loader } from "../../assetLoader/Loader";
import { CurveSet } from "playcanvas";
import { Curve } from "playcanvas";

export class TestEffect extends Entity {
  constructor() {
    super();
    this._initParticle();
  }

  _initParticle() {
    this.particleEntity = new Entity();
    this.addChild(this.particleEntity);
    let texture = Loader.getAssetByKey("perfect").resource;

    let velocityGraph = new CurveSet([
      [0, -1, 1, -1],
      [0, -3, 1, -3],
      [0, -1, 1, -1]
    ]);

    let velocityGraph2 = new CurveSet([
      [0, 1, 1, 1],
      [0, 3, 1, 3],
      [0, 1, 1, 1]
    ]);
    let scaleGraph = new Curve([
      0, 0.256,
      0.421, 0.8,
      1, 0,
    ]);
    let colorGraph = new CurveSet([
      [0, 255 / 255, 0.5, 52 / 255, 1, 209 / 255],
      [0, 6 / 255, 0.5, 255 / 255, 1, 6 / 255],
      [0, 6 / 255, 0.5, 6 / 255, 1, 255 / 255],
    ]);

    let alphaGraph = new Curve([
      0, 1,
      0.43, 0.4,
      1, 0,
    ])
    this.particleEntity.addComponent("particlesystem", {
      autoPlay: false,
      lifetime: 5,
      rate: 0.1,
      rate2: 0.1,
      startAngle: 0,
      startAngle: 0,
      numParticles: 30,
      loop: true,
      colorMap: texture,
      velocityGraph: velocityGraph,
      velocityGraph2: velocityGraph2,
      scaleGraph: scaleGraph,
      colorGraph: colorGraph,
      alphaGraph: alphaGraph,
    });
    this.particleEntity.setLocalScale(0.2, 0.2, 0.2);
  }

  play() {
    this.particleEntity.particlesystem.play();
  }
  stop() {
    this.particleEntity.particlesystem.stop();

  }
}