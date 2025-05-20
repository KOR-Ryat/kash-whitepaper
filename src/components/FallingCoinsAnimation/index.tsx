import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

// --- UTILITIES (Vector3, Matrix44 from original JS) ---
const Vector3 = {
    create: (x?: number, y?: number, z?: number) => ({ x: x || 0, y: y || 0, z: z || 0 }),
    dot: (v0: {x:number,y:number,z:number}, v1: {x:number,y:number,z:number}) => v0.x * v1.x + v0.y * v1.y + v0.z * v1.z,
    cross: (v: {x:number,y:number,z:number}, v0: {x:number,y:number,z:number}, v1: {x:number,y:number,z:number}) => {
        v.x = v0.y * v1.z - v0.z * v1.y;
        v.y = v0.z * v1.x - v0.x * v1.z;
        v.z = v0.x * v1.y - v0.y * v1.x;
    },
    normalize: (v: {x:number,y:number,z:number}) => {
        let l = v.x * v.x + v.y * v.y + v.z * v.z;
        if (l > 0.00001) {
            l = 1.0 / Math.sqrt(l);
            v.x *= l;
            v.y *= l;
            v.z *= l;
        }
    },
    arrayForm: (v: {x:number,y:number,z:number, array?: Float32Array}) => {
        if (v.array) {
            v.array[0] = v.x;
            v.array[1] = v.y;
            v.array[2] = v.z;
        } else {
            v.array = new Float32Array([v.x, v.y, v.z]);
        }
        return v.array;
    }
};

const Matrix44 = {
    createIdentity: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
    loadProjection: (m: Float32Array, aspect: number, vdeg: number, near: number, far: number) => {
        const h = near * Math.tan(vdeg * Math.PI / 180.0 * 0.5) * 2.0;
        const w = h * aspect;
        m[0] = 2.0 * near / w; m[1] = 0.0; m[2] = 0.0; m[3] = 0.0;
        m[4] = 0.0; m[5] = 2.0 * near / h; m[6] = 0.0; m[7] = 0.0;
        m[8] = 0.0; m[9] = 0.0; m[10] = -(far + near) / (far - near); m[11] = -1.0;
        m[12] = 0.0; m[13] = 0.0; m[14] = -2.0 * far * near / (far - near); m[15] = 0.0;
    },
    loadLookAt: (m: Float32Array, vpos: {x:number,y:number,z:number}, vlook: {x:number,y:number,z:number}, vup: {x:number,y:number,z:number}) => {
        const frontv = Vector3.create(vpos.x - vlook.x, vpos.y - vlook.y, vpos.z - vlook.z);
        Vector3.normalize(frontv);
        const sidev = Vector3.create(1,0,0);
        Vector3.cross(sidev, vup, frontv);
        Vector3.normalize(sidev);
        const topv = Vector3.create(1,0,0);
        Vector3.cross(topv, frontv, sidev);
        Vector3.normalize(topv);
        m[0] = sidev.x; m[1] = topv.x; m[2] = frontv.x; m[3] = 0.0;
        m[4] = sidev.y; m[5] = topv.y; m[6] = frontv.y; m[7] = 0.0;
        m[8] = sidev.z; m[9] = topv.z; m[10] = frontv.z; m[11] = 0.0;
        m[12] = -(vpos.x * m[0] + vpos.y * m[4] + vpos.z * m[8]);
        m[13] = -(vpos.x * m[1] + vpos.y * m[5] + vpos.z * m[9]);
        m[14] = -(vpos.x * m[2] + vpos.y * m[6] + vpos.z * m[10]);
        m[15] = 1.0;
    }
};

// --- SHADERS ---
// Vertex Shader (Identical to sakura_point_vsh)
const COIN_POINT_VSH = `
uniform mat4 uProjection;
uniform mat4 uModelview;
uniform vec3 uResolution;
uniform vec3 uOffset;
uniform vec3 uDOF;  //x:focus distance, y:focus radius, z:max radius
uniform vec3 uFade; //x:start distance, y:half distance, z:near fade start

attribute vec3 aPosition;
attribute vec3 aEuler;
attribute vec2 aMisc; //x:size, y:fade

varying vec3 pposition;
varying float psize;
varying float palpha;
varying float pdist;

varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 normal;

varying float diffuse;
varying float specular;
varying float rstop;
varying float distancefade;

void main(void) {
    vec4 pos = uModelview * vec4(aPosition + uOffset, 1.0);
    gl_Position = uProjection * pos;
    gl_PointSize = aMisc.x * uProjection[1][1] / -pos.z * uResolution.y * 0.5;
    
    pposition = pos.xyz;
    psize = aMisc.x;
    pdist = length(pos.xyz);
    palpha = smoothstep(0.0, 1.0, (pdist - 0.1) / uFade.z);
    
    vec3 elrsn = sin(aEuler);
    vec3 elrcs = cos(aEuler);
    mat3 rotx = mat3(
        1.0, 0.0, 0.0,
        0.0, elrcs.x, elrsn.x,
        0.0, -elrsn.x, elrcs.x
    );
    mat3 roty = mat3(
        elrcs.y, 0.0, -elrsn.y,
        0.0, 1.0, 0.0,
        elrsn.y, 0.0, elrcs.y
    );
    mat3 rotz = mat3(
        elrcs.z, elrsn.z, 0.0, 
        -elrsn.z, elrcs.z, 0.0,
        0.0, 0.0, 1.0
    );
    mat3 rotmat = rotx * roty * rotz;
    normal = rotmat[2];
    
    mat3 trrotm = mat3(
        rotmat[0][0], rotmat[1][0], rotmat[2][0],
        rotmat[0][1], rotmat[1][1], rotmat[2][1],
        rotmat[0][2], rotmat[1][2], rotmat[2][2]
    );
    normX = trrotm[0];
    normY = trrotm[1];
    normZ = trrotm[2];
    
    const vec3 lit = vec3(0.6917144638660746, 0.6917144638660746, -0.20751433915982237);
    
    float tmpdfs = dot(lit, normal);
    if(tmpdfs < 0.0) {
        normal = -normal;
        tmpdfs = dot(lit, normal);
    }
    diffuse = 0.4 + tmpdfs;
    
    vec3 eyev = normalize(-pos.xyz);
    if(dot(eyev, normal) > 0.0) {
        vec3 hv = normalize(eyev + lit);
        specular = pow(max(dot(hv, normal), 0.0), 20.0);
    }
    else {
        specular = 0.0;
    }
    
    rstop = clamp((abs(pdist - uDOF.x) - uDOF.y) / uDOF.z, 0.0, 1.0);
    rstop = pow(rstop, 0.5);
    distancefade = min(1.0, exp((uFade.x - pdist) * 0.69315 / uFade.y));
}`;

// Fragment Shader (Modified for gold coin)
const COIN_POINT_FSH = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec3 uDOF;
uniform vec3 uFade;

const vec3 fadeCol = vec3(0.08, 0.03, 0.06); // Background fade color from original

varying vec3 pposition;
varying float psize;
varying float palpha;
varying float pdist;

varying vec3 normX;
varying vec3 normY;
varying vec3 normZ;
varying vec3 normal;

varying float diffuse;
varying float specular;
varying float rstop;
varying float distancefade;

void main(void) {
    vec3 p = vec3(gl_PointCoord - vec2(0.5, 0.5), 0.0) * 2.0;
    vec3 d = vec3(0.0, 0.0, -1.0);
    float nd = normZ.z;
    if(abs(nd) < 0.0001) discard;
    
    float np = dot(normZ, p);
    vec3 tp = p + d * np / nd;
    vec2 coord = vec2(dot(normX, tp), dot(normY, tp));
    
    // --- MODIFICATION FOR COIN SHAPE ---
    float coin_r = length(coord); // Distance from center for a circle
    
    if(coin_r > rstop) discard; // Use rstop for DOF, makes circle edge soft based on focus
    if(coin_r > 1.0) discard; // Ensure it's a circle within the point sprite

    // --- MODIFICATION FOR COIN COLOR ---
    // Gold color (e.g., R=255, G=215, B=0 -> normalized: 1.0, 0.843, 0.0)
    // Let's use a slightly brighter yellow-gold: vec3(1.0, 0.87, 0.2)
    vec3 baseCoinColor = vec3(1.0, 0.87, 0.2); 

    // Add subtle shading to give it a bit of a 3D feel
    // Darken edges slightly, highlight center
    float edge_darken = smoothstep(0.7, 1.0, coin_r);
    vec3 shadedCoinColor = mix(baseCoinColor, baseCoinColor * 0.7, edge_darken);
    
    vec3 col = shadedCoinColor;
    col = col * diffuse + specular * vec3(1.0, 1.0, 0.8); // Apply lighting, specular can be whitish-yellow

    col = mix(fadeCol, col, distancefade); // Mix with background fade color
    
    float alpha = (rstop > 0.001)? (0.99975 - coin_r / (rstop * 2.0)) : 1.0;
    alpha = smoothstep(0.0, 1.0, alpha) * palpha;
    
    // Original shader multiplied color by 0.5. Let's keep it for consistency with bloom.
    gl_FragColor = vec4(col * 2.0, alpha); 
}`;

const FX_COMMON_VSH = `
uniform vec3 uResolution;
attribute vec2 aPosition;
varying vec2 texCoord;
varying vec2 screenCoord;
void main(void) {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    texCoord = aPosition.xy * 0.5 + vec2(0.5, 0.5);
    screenCoord = aPosition.xy * vec2(uResolution.z, 1.0);
}`;

const BG_FSH = `
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 uTimes;
varying vec2 texCoord;
varying vec2 screenCoord;
void main(void) {
    vec3 col;
    float c;
    vec2 tmpv = texCoord * vec2(0.8, 1.0) - vec2(0.95, 1.0);
    c = exp(-pow(length(tmpv) * 1.8, 2.0));
    col = mix(vec3(0.02, 0.0, 0.03), vec3(0.96, 0.98, 1.0) * 1.5, c);
    gl_FragColor = vec4(col * 0.5, 1.0);
}`;

const FX_BRIGHTBUF_FSH = `
#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D uSrc;
uniform vec2 uDelta;
varying vec2 texCoord;
varying vec2 screenCoord;
void main(void) {
    vec4 col = texture2D(uSrc, texCoord);
    gl_FragColor = vec4(col.rgb * 2.0 - vec3(0.5), 1.0);
}`;

const FX_DIRBLUR_R4_FSH = `
#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D uSrc;
uniform vec2 uDelta;
uniform vec4 uBlurDir; //dir(x, y), stride(z, w)
varying vec2 texCoord;
varying vec2 screenCoord;
void main(void) {
    vec4 col = texture2D(uSrc, texCoord);
    col = col + texture2D(uSrc, texCoord + uBlurDir.xy * uDelta);
    col = col + texture2D(uSrc, texCoord - uBlurDir.xy * uDelta);
    col = col + texture2D(uSrc, texCoord + (uBlurDir.xy + uBlurDir.zw) * uDelta);
    col = col + texture2D(uSrc, texCoord - (uBlurDir.xy + uBlurDir.zw) * uDelta);
    gl_FragColor = col / 5.0;
}`;

const PP_FINAL_FSH = `
#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D uSrc;
uniform sampler2D uBloom;
uniform vec2 uDelta;
varying vec2 texCoord;
varying vec2 screenCoord;
void main(void) {
    vec4 srccol = texture2D(uSrc, texCoord) * 2.0;
    vec4 bloomcol = texture2D(uBloom, texCoord);
    vec4 col;
    col = srccol + bloomcol * (vec4(1.0) + srccol);
    col *= smoothstep(1.0, 0.0, pow(length((texCoord - vec2(0.5)) * 2.0), 1.2) * 0.5);
    col = pow(col, vec4(0.45454545454545)); //(1.0 / 2.2)
    gl_FragColor = vec4(col.rgb, 1.0);
    gl_FragColor.a = 1.0;
}`;


// --- PARTICLE CLASS (BlossomParticle renamed to CoinParticle) ---
class CoinParticle {
    velocity: number[];
    rotation: number[];
    position: number[];
    euler: number[];
    size: number;
    alpha: number;
    zkey: number;

    constructor() {
        this.velocity = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.position = [0, 0, 0];
        this.euler = [0, 0, 0];
        this.size = 1.0;
        this.alpha = 1.0;
        this.zkey = 0.0;
    }

    setVelocity(vx: number, vy: number, vz: number) {
        this.velocity[0] = vx; this.velocity[1] = vy; this.velocity[2] = vz;
    }
    setRotation(rx: number, ry: number, rz: number) {
        this.rotation[0] = rx; this.rotation[1] = ry; this.rotation[2] = rz;
    }
    setPosition(nx: number, ny: number, nz: number) {
        this.position[0] = nx; this.position[1] = ny; this.position[2] = nz;
    }
    setEulerAngles(rx: number, ry: number, rz: number) {
        this.euler[0] = rx; this.euler[1] = ry; this.euler[2] = rz;
    }
    setSize(s: number) { this.size = s; }
    update(dt: number, _et: number) {
        this.position[0] += this.velocity[0] * dt;
        this.position[1] += this.velocity[1] * dt;
        this.position[2] += this.velocity[2] * dt;
        this.euler[0] += this.rotation[0] * dt;
        this.euler[1] += this.rotation[1] * dt;
        this.euler[2] += this.rotation[2] * dt;
    }
}

// --- Render Target type ---
interface RenderTarget {
    width: number;
    height: number;
    sizeArray: Float32Array;
    dtxArray: Float32Array;
    frameBuffer: WebGLFramebuffer;
    renderBuffer: WebGLRenderbuffer;
    texture: WebGLTexture;
}
interface EffectObject {
    program: WebGLProgram;
    dataArray: Float32Array;
    buffer: WebGLBuffer;
}


const FallingCoinsAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    
    // Refs for stateful WebGL objects and animation parameters
    const timeInfoRef = useRef({ start: 0, prev: 0, delta: 0, elapsed: 0 });
    const renderSpecRef = useRef<any>({ // `any` for simplicity, can be typed further
        width:0, height:0, aspect:1, array:new Float32Array(3),
        halfWidth:0, halfHeight:0, halfArray:new Float32Array(3),
        pointSize: {min:0, max:0}
    });
    const projectionRef = useRef({
        angle:60, nearfar:new Float32Array([0.1, 100.0]), matrix:Matrix44.createIdentity()
    });
    const cameraRef = useRef({
        position:Vector3.create(0,0,100), lookat:Vector3.create(0,0,0), up:Vector3.create(0,1,0),
        dof:Vector3.create(10.0, 4.0, 8.0), matrix:Matrix44.createIdentity()
    });
    const pointCoinRef = useRef<any>({ // Renamed from pointFlower
        program: null, particles: [], dataArray: null, buffer: null,
        offset: new Float32Array([0,0,0]), fader:Vector3.create(0,10,0),
        numCoins: 1600, // Renamed from numFlowers
        positionArrayOffset:0, eulerArrayOffset:0, miscArrayOffset:0, area: Vector3.create(20,20,20)
    });
    const effectLibRef = useRef<{[key: string]: EffectObject}>({});
    const sceneStandByRef = useRef(false);
    const requestRef = useRef<number>();
    const animatingRef = useRef(true);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            glRef.current = canvas.getContext('experimental-webgl');
        } catch (e) {
            console.error("WebGL not supported.", e);
            alert("WebGL not supported.");
            return;
        }
        const gl = glRef.current;
        if (!gl) {
            alert("Failed to get WebGL context.");
            return;
        }

        // Hoist function definitions or define them before use
        // --- WebGL Helper Functions ---
        const createRenderTarget = (w: number, h: number): RenderTarget => {
            const rt: Partial<RenderTarget> = { // Use Partial for initial construction
                width: w, height: h,
                sizeArray: new Float32Array([w, h, w / h]),
                dtxArray: new Float32Array([1.0 / w, 1.0 / h])
            };
            rt.frameBuffer = gl.createFramebuffer()!;
            rt.renderBuffer = gl.createRenderbuffer()!;
            rt.texture = gl.createTexture()!;

            gl.bindTexture(gl.TEXTURE_2D, rt.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            gl.bindFramebuffer(gl.FRAMEBUFFER, rt.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rt.texture, 0);
            gl.bindRenderbuffer(gl.RENDERBUFFER, rt.renderBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rt.renderBuffer);

            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return rt as RenderTarget;
        };
        
        const deleteRenderTarget = (rt: RenderTarget) => {
            if (!gl || !rt) return;
            gl.deleteFramebuffer(rt.frameBuffer);
            gl.deleteRenderbuffer(rt.renderBuffer);
            gl.deleteTexture(rt.texture);
        };

        const compileShader = (shtype: number, shsrc: string): WebGLShader | null => {
            const retsh = gl.createShader(shtype)!;
            gl.shaderSource(retsh, shsrc);
            gl.compileShader(retsh);
            if (!gl.getShaderParameter(retsh, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(retsh));
                gl.deleteShader(retsh);
                return null;
            }
            return retsh;
        };

        const createShader = (vtxsrc: string, frgsrc: string, uniformlist?: string[], attrlist?: string[]): WebGLProgram | null => {
            const vsh = compileShader(gl.VERTEX_SHADER, vtxsrc);
            const fsh = compileShader(gl.FRAGMENT_SHADER, frgsrc);
            if (!vsh || !fsh) return null;

            const prog = gl.createProgram()!;
            gl.attachShader(prog, vsh);
            gl.attachShader(prog, fsh);
            gl.deleteShader(vsh);
            gl.deleteShader(fsh);
            gl.linkProgram(prog);
            if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(prog));
                return null;
            }

            if (uniformlist) {
                (prog as any).uniforms = {};
                uniformlist.forEach(u => (prog as any).uniforms[u] = gl.getUniformLocation(prog, u));
            }
            if (attrlist) {
                (prog as any).attributes = {};
                attrlist.forEach(a => (prog as any).attributes[a] = gl.getAttribLocation(prog, a));
            }
            return prog;
        };

        const useShader = (prog: WebGLProgram) => {
            gl.useProgram(prog);
            if ((prog as any).attributes) {
                for (const attr in (prog as any).attributes) {
                    gl.enableVertexAttribArray((prog as any).attributes[attr]);
                }
            }
        };

        const unuseShader = (prog: WebGLProgram) => {
            if ((prog as any).attributes) {
                for (const attr in (prog as any).attributes) {
                    gl.disableVertexAttribArray((prog as any).attributes[attr]);
                }
            }
            gl.useProgram(null);
        };

        // --- Coin Particle System ---
        const createPointCoins = () => { // Renamed from createPointFlowers
            const renderSpec = renderSpecRef.current;
            const pointCoin = pointCoinRef.current;

            const prm = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
            renderSpec.pointSize = { min: prm[0], max: prm[1] };

            pointCoin.program = createShader(
                COIN_POINT_VSH, COIN_POINT_FSH,
                ['uProjection', 'uModelview', 'uResolution', 'uOffset', 'uDOF', 'uFade'],
                ['aPosition', 'aEuler', 'aMisc']
            );
            if (!pointCoin.program) { console.error("Failed to create coin shader program"); return; }

            useShader(pointCoin.program);
            pointCoin.particles = new Array(pointCoin.numCoins);
            pointCoin.dataArray = new Float32Array(pointCoin.numCoins * (3 + 3 + 2));
            pointCoin.positionArrayOffset = 0; // This is an index, not byte offset
            pointCoin.eulerArrayOffset = pointCoin.numCoins * 3;
            pointCoin.miscArrayOffset = pointCoin.numCoins * 6;

            pointCoin.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, pointCoin.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, pointCoin.dataArray, gl.DYNAMIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            unuseShader(pointCoin.program);

            for (let i = 0; i < pointCoin.numCoins; i++) {
                pointCoin.particles[i] = new CoinParticle();
            }
        };

        const initPointCoins = () => { // Renamed from initPointFlowers
            const renderSpec = renderSpecRef.current;
            const pointCoin = pointCoinRef.current;

            pointCoin.area = Vector3.create(20.0, 20.0, 20.0);
            pointCoin.area.x = pointCoin.area.y * renderSpec.aspect;
            pointCoin.fader.x = 10.0;
            pointCoin.fader.y = pointCoin.area.z;
            pointCoin.fader.z = 0.1;

            const PI2 = Math.PI * 2.0;
            const symmetryrand = () => (Math.random() * 2.0 - 1.0);
            for (let i = 0; i < pointCoin.numCoins; i++) {
                const tmpprtcl = pointCoin.particles[i];
                const tmpv3 = Vector3.create(symmetryrand() * 0.3 + 0.8, symmetryrand() * 0.2 - 1.0, symmetryrand() * 0.3 + 0.5);
                Vector3.normalize(tmpv3);
                const tmpv = 2.0 + Math.random() * 1.0;
                tmpprtcl.setVelocity(tmpv3.x * tmpv, tmpv3.y * tmpv, tmpv3.z * tmpv);
                tmpprtcl.setRotation(symmetryrand() * PI2 * 0.5, symmetryrand() * PI2 * 0.5, symmetryrand() * PI2 * 0.5);
                tmpprtcl.setPosition(symmetryrand() * pointCoin.area.x, symmetryrand() * pointCoin.area.y, symmetryrand() * pointCoin.area.z);
                tmpprtcl.setEulerAngles(Math.random() * PI2, Math.random() * PI2, Math.random() * PI2);
                tmpprtcl.setSize(0.9 + Math.random() * 0.1);
            }
        };

        const renderPointCoins = () => { // Renamed from renderPointFlowers
            const timeInfo = timeInfoRef.current;
            const camera = cameraRef.current;
            const pointCoin = pointCoinRef.current;
            const projection = projectionRef.current;
            const renderSpec = renderSpecRef.current;

            const PI2 = Math.PI * 2.0;
            const repeatPos = (prt: CoinParticle, cmp: number, limit: number) => {
                if (Math.abs(prt.position[cmp]) - prt.size * 0.5 > limit) {
                    prt.position[cmp] = (prt.position[cmp] > 0) ? prt.position[cmp] - limit * 2.0 : prt.position[cmp] + limit * 2.0;
                }
            };
            const repeatEuler = (prt: CoinParticle, cmp: number) => {
                prt.euler[cmp] = prt.euler[cmp] % PI2;
                if (prt.euler[cmp] < 0.0) prt.euler[cmp] += PI2;
            };

            pointCoin.particles.forEach((prtcl: CoinParticle) => {
                prtcl.update(timeInfo.delta, timeInfo.elapsed);
                repeatPos(prtcl, 0, pointCoin.area.x);
                repeatPos(prtcl, 1, pointCoin.area.y);
                repeatPos(prtcl, 2, pointCoin.area.z);
                repeatEuler(prtcl, 0); repeatEuler(prtcl, 1); repeatEuler(prtcl, 2);
                prtcl.alpha = 1.0;
                prtcl.zkey = (camera.matrix[2] * prtcl.position[0] + camera.matrix[6] * prtcl.position[1] + camera.matrix[10] * prtcl.position[2] + camera.matrix[14]);
            });

            pointCoin.particles.sort((p0: CoinParticle, p1: CoinParticle) => p0.zkey - p1.zkey);

            let ipos = pointCoin.positionArrayOffset; // Actual index
            let ieuler = pointCoin.eulerArrayOffset; // Actual index
            let imisc = pointCoin.miscArrayOffset; // Actual index
            pointCoin.particles.forEach((prtcl: CoinParticle) => {
                pointCoin.dataArray[ipos++] = prtcl.position[0];
                pointCoin.dataArray[ipos++] = prtcl.position[1];
                pointCoin.dataArray[ipos++] = prtcl.position[2];
                pointCoin.dataArray[ieuler++] = prtcl.euler[0];
                pointCoin.dataArray[ieuler++] = prtcl.euler[1];
                pointCoin.dataArray[ieuler++] = prtcl.euler[2];
                pointCoin.dataArray[imisc++] = prtcl.size;
                pointCoin.dataArray[imisc++] = prtcl.alpha;
            });

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            
            const prog = pointCoin.program;
            useShader(prog);
            gl.uniformMatrix4fv((prog as any).uniforms.uProjection, false, projection.matrix);
            gl.uniformMatrix4fv((prog as any).uniforms.uModelview, false, camera.matrix);
            gl.uniform3fv((prog as any).uniforms.uResolution, renderSpec.array);
            gl.uniform3fv((prog as any).uniforms.uDOF, Vector3.arrayForm(camera.dof));
            gl.uniform3fv((prog as any).uniforms.uFade, Vector3.arrayForm(pointCoin.fader));

            gl.bindBuffer(gl.ARRAY_BUFFER, pointCoin.buffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, pointCoin.dataArray); // Use bufferSubData for updates

            // Important: The offsets here are BYTE offsets for vertexAttribPointer
            const bytesPerFloat = Float32Array.BYTES_PER_ELEMENT;
            gl.vertexAttribPointer((prog as any).attributes.aPosition, 3, gl.FLOAT, false, 0, pointCoin.positionArrayOffset * bytesPerFloat);
            gl.vertexAttribPointer((prog as any).attributes.aEuler, 3, gl.FLOAT, false, 0, pointCoin.eulerArrayOffset * bytesPerFloat);
            gl.vertexAttribPointer((prog as any).attributes.aMisc, 2, gl.FLOAT, false, 0, pointCoin.miscArrayOffset * bytesPerFloat);
            
            for (let i = 1; i < 2; i++) { // Doubler loop from original
                const zpos = i * -2.0;
                pointCoin.offset[0] = pointCoin.area.x * -1.0; pointCoin.offset[1] = pointCoin.area.y * -1.0; pointCoin.offset[2] = pointCoin.area.z * zpos;
                gl.uniform3fv((prog as any).uniforms.uOffset, pointCoin.offset);
                gl.drawArrays(gl.POINT, 0, pointCoin.numCoins);
                
                pointCoin.offset[0] = pointCoin.area.x * -1.0; pointCoin.offset[1] = pointCoin.area.y *  1.0; pointCoin.offset[2] = pointCoin.area.z * zpos;
                gl.uniform3fv((prog as any).uniforms.uOffset, pointCoin.offset);
                gl.drawArrays(gl.POINT, 0, pointCoin.numCoins);

                pointCoin.offset[0] = pointCoin.area.x *  1.0; pointCoin.offset[1] = pointCoin.area.y * -1.0; pointCoin.offset[2] = pointCoin.area.z * zpos;
                gl.uniform3fv((prog as any).uniforms.uOffset, pointCoin.offset);
                gl.drawArrays(gl.POINT, 0, pointCoin.numCoins);

                pointCoin.offset[0] = pointCoin.area.x *  1.0; pointCoin.offset[1] = pointCoin.area.y *  1.0; pointCoin.offset[2] = pointCoin.area.z * zpos;
                gl.uniform3fv((prog as any).uniforms.uOffset, pointCoin.offset);
                gl.drawArrays(gl.POINT, 0, pointCoin.numCoins);
            }
            pointCoin.offset[0] = 0.0; pointCoin.offset[1] = 0.0; pointCoin.offset[2] = 0.0;
            gl.uniform3fv((prog as any).uniforms.uOffset, pointCoin.offset);
            gl.drawArrays(gl.POINT, 0, pointCoin.numCoins);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            unuseShader(prog);
            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND);
        };

        // --- Effects Library ---
        const createEffectProgram = (vtxsrc: string, frgsrc: string, exunifs?: string[], exattrs?: string[]): EffectObject | null => {
            const unifs = ['uResolution', 'uSrc', 'uDelta'].concat(exunifs || []);
            const attrs = ['aPosition'].concat(exattrs || []);
            const program = createShader(vtxsrc, frgsrc, unifs, attrs);
            if (!program) return null;

            const ret: Partial<EffectObject> = { program };
            ret.dataArray = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
            ret.buffer = gl.createBuffer()!;
            gl.bindBuffer(gl.ARRAY_BUFFER, ret.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, ret.dataArray, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            return ret as EffectObject;
        };

        const useEffect = (fxobj: EffectObject, srctex: RenderTarget | null) => {
            const renderSpec = renderSpecRef.current;
            const prog = fxobj.program;
            useShader(prog);
            gl.uniform3fv((prog as any).uniforms.uResolution, renderSpec.array);
            if (srctex) {
                gl.uniform2fv((prog as any).uniforms.uDelta, srctex.dtxArray);
                gl.uniform1i((prog as any).uniforms.uSrc, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, srctex.texture);
            }
        };
        const drawEffect = (fxobj: EffectObject) => {
            gl.bindBuffer(gl.ARRAY_BUFFER, fxobj.buffer);
            gl.vertexAttribPointer((fxobj.program as any).attributes.aPosition, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const unuseEffect = (fxobj: EffectObject) => {
            unuseShader(fxobj.program);
        };

        const createEffectLib = () => {
            const effectLib = effectLibRef.current;
            effectLib.sceneBg = createEffectProgram(FX_COMMON_VSH, BG_FSH, ['uTimes'])!;
            effectLib.mkBrightBuf = createEffectProgram(FX_COMMON_VSH, FX_BRIGHTBUF_FSH)!;
            effectLib.dirBlur = createEffectProgram(FX_COMMON_VSH, FX_DIRBLUR_R4_FSH, ['uBlurDir'])!;
            effectLib.finalComp = createEffectProgram(FX_COMMON_VSH, PP_FINAL_FSH, ['uBloom'])!;
             // Check if any are null and handle error
            if (Object.values(effectLib).some(p => p === null)) {
                console.error("Failed to create one or more effect programs.");
            }
        };
        
        const renderBackground = () => {
            const timeInfo = timeInfoRef.current;
            const effectLib = effectLibRef.current;
            gl.disable(gl.DEPTH_TEST);
            useEffect(effectLib.sceneBg, null);
            gl.uniform2f((effectLib.sceneBg.program as any).uniforms.uTimes, timeInfo.elapsed, timeInfo.delta);
            drawEffect(effectLib.sceneBg);
            unuseEffect(effectLib.sceneBg);
            gl.enable(gl.DEPTH_TEST);
        };

        const renderPostProcess = () => {
            const renderSpec = renderSpecRef.current;
            const effectLib = effectLibRef.current;

            gl.enable(gl.TEXTURE_2D); // Though WebGL2 doesn't need this typically
            gl.disable(gl.DEPTH_TEST);
            const bindRT = (rt: RenderTarget, isclear: boolean) => {
                gl.bindFramebuffer(gl.FRAMEBUFFER, rt.frameBuffer);
                gl.viewport(0,0,rt.width, rt.height);
                if (isclear) {
                    gl.clearColor(0,0,0,0);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                }
            };

            bindRT(renderSpec.wHalfRT0, true);
            useEffect(effectLib.mkBrightBuf, renderSpec.mainRT);
            drawEffect(effectLib.mkBrightBuf);
            unuseEffect(effectLib.mkBrightBuf);

            for (let i = 0; i < 2; i++) {
                const p = 1.5 + 1 * i; const s = 2.0 + 1 * i;
                bindRT(renderSpec.wHalfRT1, true);
                useEffect(effectLib.dirBlur, renderSpec.wHalfRT0);
                gl.uniform4f((effectLib.dirBlur.program as any).uniforms.uBlurDir, p, 0.0, s, 0.0);
                drawEffect(effectLib.dirBlur);
                unuseEffect(effectLib.dirBlur);

                bindRT(renderSpec.wHalfRT0, true);
                useEffect(effectLib.dirBlur, renderSpec.wHalfRT1);
                gl.uniform4f((effectLib.dirBlur.program as any).uniforms.uBlurDir, 0.0, p, 0.0, s);
                drawEffect(effectLib.dirBlur);
                unuseEffect(effectLib.dirBlur);
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0,0,renderSpec.width, renderSpec.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            useEffect(effectLib.finalComp, renderSpec.mainRT);
            gl.uniform1i((effectLib.finalComp.program as any).uniforms.uBloom, 1);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, renderSpec.wHalfRT0.texture);
            drawEffect(effectLib.finalComp);
            unuseEffect(effectLib.finalComp);
            gl.enable(gl.DEPTH_TEST);
        };

        // --- Scene Management ---
        const createScene = () => {
            createEffectLib();
            createPointCoins();
            // createPostProcess() // original had this, seems empty
            sceneStandByRef.current = true;
        };
        const initScene = () => {
            const renderSpec = renderSpecRef.current;
            const projection = projectionRef.current;
            const camera = cameraRef.current;
            const pointCoin = pointCoinRef.current;

            initPointCoins();
            // initPostProcess() // original had this, seems empty
            camera.position.z = pointCoin.area.z + projection.nearfar[0]; // Ensure coins are visible
            projection.angle = Math.atan2(pointCoin.area.y, camera.position.z + pointCoin.area.z) * 180.0 / Math.PI * 2.0;
            Matrix44.loadProjection(projection.matrix, renderSpec.aspect, projection.angle, projection.nearfar[0], projection.nearfar[1]);
        };
        const renderScene = () => {
            const camera = cameraRef.current;
            const renderSpec = renderSpecRef.current;

            Matrix44.loadLookAt(camera.matrix, camera.position, camera.lookat, camera.up);
            gl.enable(gl.DEPTH_TEST);
            gl.bindFramebuffer(gl.FRAMEBUFFER, renderSpec.mainRT.frameBuffer);
            gl.viewport(0,0,renderSpec.mainRT.width, renderSpec.mainRT.height);
            gl.clearColor(0.005, 0, 0.05, 0); // Dark purple, almost black
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            renderBackground();
            renderPointCoins();
            renderPostProcess();
        };

        // --- Canvas and Viewport Setup ---
        const makeCanvasFullScreen = (targetCanvas: HTMLCanvasElement) => {
            // Use parent dimensions or window dimensions
            const parent = targetCanvas.parentElement;
            if (parent && parent !== document.body) {
                 targetCanvas.width = parent.clientWidth;
                 targetCanvas.height = parent.clientHeight;
            } else {
                 targetCanvas.width = window.innerWidth;
                 targetCanvas.height = window.innerHeight;
            }
        };

        const setViewports = () => {
            const renderSpec = renderSpecRef.current;
            makeCanvasFullScreen(canvas);
            renderSpec.setSize = (w:number, h:number) => {
                renderSpec.width = w; renderSpec.height = h;
                renderSpec.aspect = w/h;
                renderSpec.array[0] = w; renderSpec.array[1] = h; renderSpec.array[2] = renderSpec.aspect;
                renderSpec.halfWidth = Math.floor(w/2); renderSpec.halfHeight = Math.floor(h/2);
                renderSpec.halfArray[0] = renderSpec.halfWidth; renderSpec.halfArray[1] = renderSpec.halfHeight;
                renderSpec.halfArray[2] = renderSpec.halfWidth / renderSpec.halfHeight;
            };
            renderSpec.setSize(canvas.width, canvas.height);
            gl.viewport(0,0,renderSpec.width, renderSpec.height);

            const rtfunc = (rtname: string, rtw: number, rth: number) => {
                if (renderSpec[rtname]) deleteRenderTarget(renderSpec[rtname]);
                renderSpec[rtname] = createRenderTarget(rtw, rth);
            };
            rtfunc('mainRT', renderSpec.width, renderSpec.height);
            rtfunc('wHalfRT0', renderSpec.halfWidth, renderSpec.halfHeight);
            rtfunc('wHalfRT1', renderSpec.halfWidth, renderSpec.halfHeight);
        };

        // --- Animation Loop ---
        const animate = () => {
            const timeInfo = timeInfoRef.current;
            const curdate = Date.now(); // Use Date.now() for performance
            timeInfo.elapsed = (curdate - timeInfo.start) / 1000.0;
            timeInfo.delta = (curdate - timeInfo.prev) / 1000.0;
            timeInfo.prev = curdate;

            if (animatingRef.current) {
                requestRef.current = requestAnimationFrame(animate);
            }
            renderScene();
        };
        
        const onResize = () => {
            setViewports();
            if (sceneStandByRef.current) {
                initScene(); // Re-initialize scene with new dimensions
            }
        };


        // --- Initialization ---
        setViewports();
        createScene();
        initScene();

        const timeInfo = timeInfoRef.current;
        timeInfo.start = Date.now();
        timeInfo.prev = timeInfo.start;
        
        animatingRef.current = true;
        animate();

        window.addEventListener('resize', onResize);

        // --- Cleanup ---
        return () => {
            animatingRef.current = false;
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            window.removeEventListener('resize', onResize);

            // Cleanup WebGL resources
            const renderSpec = renderSpecRef.current;
            if (renderSpec.mainRT) deleteRenderTarget(renderSpec.mainRT);
            if (renderSpec.wHalfRT0) deleteRenderTarget(renderSpec.wHalfRT0);
            if (renderSpec.wHalfRT1) deleteRenderTarget(renderSpec.wHalfRT1);
            // Delete more RTs if wFullRT0/1 were used from original
            
            const pointCoin = pointCoinRef.current;
            if (pointCoin.buffer) gl.deleteBuffer(pointCoin.buffer);
            if (pointCoin.program) gl.deleteProgram(pointCoin.program);

            const effectLib = effectLibRef.current;
            Object.values(effectLib).forEach(fx => {
                if (fx.buffer) gl.deleteBuffer(fx.buffer);
                if (fx.program) gl.deleteProgram(fx.program);
            });

            glRef.current = null; // Release context if possible (browser dependent)
        };

    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    return <canvas ref={canvasRef} className={styles.fallingCoinsCanvas} />;
};

export default FallingCoinsAnimation;