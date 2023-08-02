import { Entity } from "playcanvas";
import { Loader } from "../../assetLoader/Loader";
import { CurveSet } from "playcanvas";
import { Curve } from "playcanvas";

export class effectMap extends Entity {
    constructor() {
        super();
        this._initParticle();
        this.setPosition(-1,1,-1)

      }
      
      _initParticle() {
        this.particleEntity = new Entity();
        this.addChild(this.particleEntity);
        let texture = Loader.getAssetByKey("perfect123").resource;
        let localVelocityGraph = new CurveSet(
          [0,0],
          [0,0],
          [1,0]
          )
        let velocityGraph = new CurveSet([
          [0, 1, 1 , 1],
          [0, 0, 1 , 0],
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
          0.2,0.8,
          0.3,0.7,
          0.4,0.6,
          0.5,0.5,
          0.6,0.4

        ])
        let emitterExtends =  new pc.Vec3(1,5,1)
        let emitterExtendsInner =  new pc.Vec3(0,0,0)
        const rotCurve = new pc.Curve([0, 100]);
        const rotCurve2 = new pc.Curve([0, -100]);
        

        this.particleEntity.addComponent("particlesystem", {
          autoPlay: true,
          numParticles: 70,
          lifetime: 20,
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
          rotationSpeedGraph: rotCurve,
          rotationSpeedGraph2: rotCurve2,
          localVelocityGraph:localVelocityGraph,
          colorMap:texture,
          alphaGraph:alphaGraph
        });
        this.particleEntity.setLocalScale(0.15, 0.15, 0.15);
      }
    
      play() {
        this.particleEntity.particlesystem.play();
      }
      stop() {
        this.particleEntity.particlesystem.stop();
    
      }
      destroy(){
        super.destroy()
      }
}