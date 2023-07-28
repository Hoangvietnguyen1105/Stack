import { Entity, extend } from "playcanvas";
import { Game } from "../game";
import { Config } from "../gameConfig";
import { Loader } from "../assetLoader/Loader";
import { calculateColor } from "../logic/Color2";


export class Box extends Entity {
    constructor() {
        super()
        this.speed = Config.box['speed']; // Tốc độ di chuyển của hộp
        this.createMateria()
        this.box = new pc.Entity("cube");
        this.box.addComponent("render", {
            type: "box",
            material: this.material,
        });
        this.box.setLocalScale(Config.box['scaleX'], Config.box['scaleY'], Config.box['scaleZ']);
        this.box.setLocalPosition(-0.3, 0.5, 0)
        this.addChild(this.box)


        this.moveLeft = false
        this.moveDown = true
        this.moveRight = true
        this.moveUp = false
        this.shouldChangeDirection = true

        Game.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }
    createMateria() {

        this.material = new pc.StandardMaterial();
        this.material.useMetalness = true;
        this.material.diffuse = new pc.Color().fromString(Config.color1['firstColor']);
        this.material.gloss = 1.3;
        this.material.metalness = 0.4;


        this.material.chunks.transformVS =`
        uniform mat4 originalTransformMat;
        varying vec3 originalPosition;
        #ifdef PIXELSNAP
        uniform vec4 uScreenSize;
        #endif
        
        #ifdef SCREENSPACE
        uniform float projectionFlipY;
        #endif
        
        #ifdef MORPHING
        uniform vec4 morph_weights_a;
        uniform vec4 morph_weights_b;
        #endif
        
        #ifdef MORPHING_TEXTURE_BASED
            uniform vec4 morph_tex_params;
        
            #ifdef WEBGPU
                ivec2 getTextureMorphCoords() {
        
                    // turn morph_vertex_id into int grid coordinates
                    ivec2 textureSize = ivec2(morph_tex_params.xy);
                    int morphGridV = int(morph_vertex_id / textureSize.x);
                    int morphGridU = int(morph_vertex_id - (morphGridV * textureSize.x));
                    morphGridV = textureSize.y - morphGridV - 1;
                    return ivec2(morphGridU, morphGridV);
                }
            #else
                vec2 getTextureMorphCoords() {
                    vec2 textureSize = morph_tex_params.xy;
                    vec2 invTextureSize = morph_tex_params.zw;
        
                    // turn morph_vertex_id into int grid coordinates
                    float morphGridV = floor(morph_vertex_id * invTextureSize.x);
                    float morphGridU = morph_vertex_id - (morphGridV * textureSize.x);
        
                    // convert grid coordinates to uv coordinates with half pixel offset
                    return vec2(morphGridU, morphGridV) * invTextureSize + (0.5 * invTextureSize);
                }
            #endif
        
        #endif
        
        #ifdef MORPHING_TEXTURE_BASED_POSITION
        uniform highp sampler2D morphPositionTex;
        #endif
        
        mat4 getModelMatrix() {
            #ifdef DYNAMICBATCH
            return getBoneMatrix(vertex_boneIndices);
            #elif defined(SKIN)
            return matrix_model * getSkinMatrix(vertex_boneIndices, vertex_boneWeights);
            #elif defined(INSTANCING)
            return mat4(instance_line1, instance_line2, instance_line3, instance_line4);
            #else
            return matrix_model;
            #endif
        }
        
        vec4 getPosition() {
            dModelMatrix = getModelMatrix();
            vec3 localPos = vertex_position;
        
            #ifdef NINESLICED
            // outer and inner vertices are at the same position, scale both
            localPos.xz *= outerScale;
        
            // offset inner vertices inside
            // (original vertices must be in [-1;1] range)
            vec2 positiveUnitOffset = clamp(vertex_position.xz, vec2(0.0), vec2(1.0));
            vec2 negativeUnitOffset = clamp(-vertex_position.xz, vec2(0.0), vec2(1.0));
            localPos.xz += (-positiveUnitOffset * innerOffset.xy + negativeUnitOffset * innerOffset.zw) * vertex_texCoord0.xy;
        
            vTiledUv = (localPos.xz - outerScale + innerOffset.xy) * -0.5 + 1.0; // uv = local pos - inner corner
        
            localPos.xz *= -0.5; // move from -1;1 to -0.5;0.5
            localPos = localPos.xzy;
            #endif
        
            #ifdef MORPHING
            #ifdef MORPHING_POS03
            localPos.xyz += morph_weights_a[0] * morph_pos0;
            localPos.xyz += morph_weights_a[1] * morph_pos1;
            localPos.xyz += morph_weights_a[2] * morph_pos2;
            localPos.xyz += morph_weights_a[3] * morph_pos3;
            #endif // MORPHING_POS03
            #ifdef MORPHING_POS47
            localPos.xyz += morph_weights_b[0] * morph_pos4;
            localPos.xyz += morph_weights_b[1] * morph_pos5;
            localPos.xyz += morph_weights_b[2] * morph_pos6;
            localPos.xyz += morph_weights_b[3] * morph_pos7;
            #endif // MORPHING_POS47
            #endif // MORPHING
        
            #ifdef MORPHING_TEXTURE_BASED_POSITION
        
                #ifdef WEBGPU
                    ivec2 morphUV = getTextureMorphCoords();
                    vec3 morphPos = texelFetch(morphPositionTex, ivec2(morphUV), 0).xyz;
                #else
                    vec2 morphUV = getTextureMorphCoords();
                    vec3 morphPos = texture2D(morphPositionTex, morphUV).xyz;
                #endif
        
                localPos += morphPos;
        
            #endif
        
            vec4 posW = dModelMatrix * vec4(localPos, 1.0);
            originalPosition = vec3(originalTransformMat * vec4(localPos, 1.0));
            #ifdef SCREENSPACE
            posW.zw = vec2(0.0, 1.0);
            #endif
            dPositionW = posW.xyz;
        
            vec4 screenPos;
            #ifdef UV1LAYOUT
            screenPos = vec4(vertex_texCoord1.xy * 2.0 - 1.0, 0.5, 1);
            #else
            #ifdef SCREENSPACE
            screenPos = posW;
            screenPos.y *= projectionFlipY;
            #else
            screenPos = matrix_viewProjection * posW;
            #endif
        
            #ifdef PIXELSNAP
            // snap vertex to a pixel boundary
            screenPos.xy = (screenPos.xy * 0.5) + 0.5;
            screenPos.xy *= uScreenSize.xy;
            screenPos.xy = floor(screenPos.xy);
            screenPos.xy *= uScreenSize.zw;
            screenPos.xy = (screenPos.xy * 2.0) - 1.0;
            #endif
            #endif
        
            return screenPos;
        }
        
        vec3 getWorldPosition() {
            return dPositionW;
        }
        `

        this.material.chunks.diffusePS = `
        #ifdef MAPCOLOR
        uniform vec3 material_diffuse;
        #endif

        varying vec3 originalPosition;

        vec3 pal(  float t,  vec3 a,vec3 b,  vec3 c, vec3 d )
        {
            return a + b*cos( 6.28318*(c*t+d) );
        }
        
        void getAlbedo() {
            dAlbedo = vec3(1.0);
            float value = fract(originalPosition.y / 3.0);
            vec3 col = pal(value, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67));
            dAlbedo = col;
        }
        `

        this.material.update();
    }

    update(dt) {


        if (!dt) {
            return
        }
        //Game.app.on("update", (dt) => {
        // this.box.box.rotate(10 * dt, 20 * dt, 30 * dt)
        const direction = new pc.Vec3(); // Hướng di chuyển
        if (this.moveUp) {
            direction.z = -1; // Di chuyển lên
        }
        if (this.moveDown) {
            direction.z = 1; // Di chuyển xuống
        }
        if (this.moveLeft) {
            direction.x = -1; // Di chuyển sang trái
        }
        if (this.moveRight) {
            direction.x = 1; // Di chuyển sang phải
        }
        var rX = Math.cos(-Math.PI * 0.25);
        var rY = Math.sin(-Math.PI * 0.25);
        direction.set(direction.x * rX - direction.z * rY, 0, direction.z * rX + direction.x * rY);

        if (direction.length() > 0) {
            direction.normalize().scale(this.speed * dt); // Chuẩn hóa và nhân với tốc độ
            this.box.translate(direction); // Di chuyển đối tượng
        }
        if (this.shouldChangeDirection) {
            const position = this.box.getPosition();
            // const screenBounds = this.box.getLocalScale().x + this.box.getLocalScale().x * 0.25; // Giới hạn màn hình
            const screenBounds = 0.3125
            // if (position.x >= screenBounds || position.x <= -screenBounds || position.z >= screenBounds || position.z <= -screenBounds) {
            //     console.log(position.x,'x')
            //     console.log(position.z,'z')
            //     this.moveLeft = !this.moveLeft;
            //     this.moveDown = !this.moveDown;
            //     this.moveRight = !this.moveRight;
            //     this.moveUp = !this.moveUp;
            // }
            if(position.x >= screenBounds &&  this.moveUp === false && this.moveLeft === false){
                this.moveLeft = !this.moveLeft;
                this.moveDown = !this.moveDown;
                this.moveRight = !this.moveRight;
                this.moveUp = !this.moveUp;
            }
            else if(position.x <= -screenBounds &&  this.moveRight === false && this.moveDown === false){
                this.moveLeft = !this.moveLeft;
                this.moveDown = !this.moveDown;
                this.moveRight = !this.moveRight;
                this.moveUp = !this.moveUp;
            }
            else if(position.z >= screenBounds &&  this.moveUp === false && this.moveRight === false){
                this.moveLeft = !this.moveLeft;
                this.moveDown = !this.moveDown;
                this.moveRight = !this.moveRight;
                this.moveUp = !this.moveUp;
            }
            else if(position.z <= -screenBounds &&  this.moveDown === false && this.moveLeft === false){
                this.moveLeft = !this.moveLeft;
                this.moveDown = !this.moveDown;
                this.moveRight = !this.moveRight;
                this.moveUp = !this.moveUp;
            }
        }
       
        



    }
    destroy() {
        super.destroy()
    }

    setUniform() {
      let transform = this.box.getWorldTransform();
      this.material.setParameter("originalTransformMat", transform.clone().data);
    }
}