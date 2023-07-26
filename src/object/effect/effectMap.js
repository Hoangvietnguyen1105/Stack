import { Entity } from "playcanvas";
import { Loader } from "../../assetLoader/Loader";
import { CurveSet } from "playcanvas";
import { Curve } from "playcanvas";

export class effectMap extends Entity {
    constructor() {
        super();
        this._initParticle();
      }
    
      _initParticle() {
        this.particleEntity = new Entity();
        this.addChild(this.particleEntity);
        let texture = Loader.getAssetByKey("perfect").resource;
        let localVelocityGraph = new CurveSet(
          [0,0],
          [0,0],
          [1,0]
          )
        let velocityGraph = new CurveSet([
          [0, 1, 1 , 1],
          [0, 1, 1 , 1],
          [0, 1, 1 , 1],
        
        ]);
    
        let velocityGraph2 = new CurveSet([
          [0,-1, 1 ,-1],
          [0,-1, 1 ,-1],
          [0,-1, 1 ,-1],
        ]);
        let scaleGraph = new Curve([
          0, 0.1,          
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
        let emitterExtends =  new pc.Vec3(1,5,1)
        let emitterExtendsInner =  new pc.Vec3(0,0,0)

        this.particleEntity.addComponent("particlesystem", {
          autoPlay: true,
          numParticles: 30,
          lifetime: 5,
          rate: 0.1,
          rate2: 0.1,
          startAngle: 0,
          startAngle: 0,
          loop: true,
          preWarm:false,
          lighting:false,
          intensity:1,
          depthWrite:false,
          depthSoftening:0,
          sort : pc.PARTICLESORT_NONE ,
          blend:pc.BLEND_NORMAL,
          stretch:0,
          alignToMotion:false,
          emitterShape:pc.EMITTERSHAPE_BOX,
          emitterExtends:emitterExtends,
          emitterExtendsInner:emitterExtendsInner,
          velocityGraph: velocityGraph,
          velocityGraph2: velocityGraph2,
          scaleGraph:scaleGraph,
          localVelocityGraph:localVelocityGraph,
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