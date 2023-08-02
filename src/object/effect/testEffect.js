import { Entity } from "playcanvas";
import { Loader } from "../../assetLoader/Loader";
import { CurveSet } from "playcanvas";
import { Curve } from "playcanvas";

export class testEffect extends Entity {
  constructor() {
    super();
        this._initParticle();
        this.setPosition(-1,-1,-1)

      }
      
      _initParticle() {
        this.particleEntity = new Entity();
        this.addChild(this.particleEntity);
        let texture = Loader.getAssetByKey("perfect").resource;
        let localVelocityGraph = new CurveSet(
          [0,0,0.5,1],
          [0,0],
          [1,0,0.5,-1]
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
          0.43, 0.4,
          1, 0,
        ])
        let emitterExtends =  new pc.Vec3(1,5,1)
        let emitterExtendsInner =  new pc.Vec3(0,0,0)



        const velocityCurve = new pc.CurveSet([
          [0, 0],     // x
          [0, -0.7],  // y
          [0, 0]      // z
      ]);
      const velocityCurve2 = new pc.CurveSet([
          [0, 0],   // x
          [0, -0.4], // y
          [0, 0]    // z
      ]);

   
      
      const scaleCurve = new pc.Curve([0, 0.1]);


      const rotCurve = new pc.Curve([0, 100]);
      const rotCurve2 = new pc.Curve([0, -100]);

        

        this.particleEntity.addComponent("particlesystem", {
          numParticles: 30,
                lifetime: 10,
                rate: 0.1,
                startAngle: 360,
                startAngle2: -360,
                emitterExtents: new pc.Vec3(5, 0, 0),
                velocityGraph: velocityCurve,
                velocityGraph2: velocityCurve2,
                scaleGraph: scaleCurve,
                rotationSpeedGraph: rotCurve,
                rotationSpeedGraph2: rotCurve2,
                colorMap: Loader.getAssetByKey('perfect').resource
        });
        this.particleEntity.setLocalScale(0.2,0.2,0.2)
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