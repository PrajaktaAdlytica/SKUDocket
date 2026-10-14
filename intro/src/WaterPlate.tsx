import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {continueRender, delayRender, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const vertex = `attribute vec2 position; varying vec2 vUv;
void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision highp float;
uniform sampler2D plate; uniform float time; uniform float strength; uniform float screenAspect;
varying vec2 vUv;
vec3 image(vec2 p){return texture2D(plate,vec2(clamp(p.x,0.,1.),1.-clamp(p.y,0.,1.))).rgb;}
void main(){
 vec2 uv=vec2(vUv.x,1.-vUv.y);
 uv.x=(uv.x-.5)*min(screenAspect/1.7777778,1.)+.5;
 uv.y=(uv.y-.5)*min(1.7777778/screenAspect,1.)+.5;
 float depth=clamp((uv.y-.59)/.41,0.,1.);
 // This shoreline follows the generated plate. The hull, cranes and quay stay rigid.
 float shore=mix(.865,.726,depth);
 float mask=smoothstep(.591,.613,uv.y)*(1.-smoothstep(shore-.025,shore,uv.x));
 float swell=sin(uv.y*115.-time*1.65+sin(uv.x*19.+time*.23)*1.4);
 float ripple=sin(uv.y*370.-time*3.0+uv.x*37.)*.55+sin(uv.y*640.+uv.x*62.+time*2.1)*.22;
 vec2 drift=vec2((swell*.0026+ripple*.0012)*(.25+depth),
  (sin(uv.x*52.+uv.y*180.-time*1.4)*.0011+ripple*.00065)*depth);
 vec3 color=image(uv+drift*mask*strength);
 // Animate only existing bright reflection pixels; no synthetic sparkle particles.
 float lum=dot(color,vec3(.2126,.7152,.0722));
 float reflected=smoothstep(.52,.92,lum)*mask;
 float glint=sin(uv.y*510.-time*3.1+sin(uv.x*45.)*2.0);
 color+=vec3(.035,.026,.014)*glint*reflected*strength;
 color*=1.+swell*.012*mask*strength;
 gl_FragColor=vec4(color,1.);
}`;

type State={gl:WebGLRenderingContext;program:WebGLProgram;texture:WebGLTexture};
export const WaterPlate=({motion=1.45,locked=false}:{motion?:number;locked?:boolean})=>{
 const frame=useCurrentFrame();const {fps,width,height}=useVideoConfig();
 const canvas=useRef<HTMLCanvasElement>(null);const state=useRef<State|null>(null);
 const [ready,setReady]=useState(false);const [handle]=useState(()=>delayRender('Load harbor water plate'));
 const [fallback,setFallback]=useState(false);
 useEffect(()=>{
  const el=canvas.current!;const gl=el.getContext('webgl',{alpha:false,preserveDrawingBuffer:true,antialias:false});
  if(!gl){setFallback(true);continueRender(handle);return;}
  const compile=(kind:number,src:string)=>{const shader=gl.createShader(kind)!;gl.shaderSource(shader,src);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader)||'Water shader compile failed');return shader;};
  const program=gl.createProgram()!;
  try{gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
   if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'Shader linking failed');
   gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const pos=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
   const texture=gl.createTexture()!;gl.bindTexture(gl.TEXTURE_2D,texture);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
   const img=new Image();let alive=true;
   img.onload=()=>{if(!alive)return;gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
    state.current={gl,program,texture};setReady(true);continueRender(handle);};
   img.onerror=()=>{setFallback(true);continueRender(handle);};img.src=staticFile('harbor-dawn.png');
   return()=>{alive=false;state.current=null;gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);};
  }catch{setFallback(true);continueRender(handle);}
 },[handle]);
 useLayoutEffect(()=>{if(!ready||!state.current)return;const {gl,program}=state.current;
  gl.viewport(0,0,width,height);gl.useProgram(program);gl.uniform1f(gl.getUniformLocation(program,'time'),frame/fps);
  gl.uniform1f(gl.getUniformLocation(program,'strength'),motion);gl.uniform1f(gl.getUniformLocation(program,'screenAspect'),width/height);gl.drawArrays(gl.TRIANGLES,0,6);
 },[frame,fps,width,height,ready,motion]);
 const t=frame/fps;
 // Continuous virtual dolly, with a small crane descent, preserves the water's own motion.
 const zoom=locked?1:interpolate(t,[0,4,8.5,11.5,13.8,18],[1.04,1.10,1.16,1.24,1.25,1.09],{extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
 const focus=locked?0:interpolate(t,[0,8.5,10,13.8,15.2,18],[0,0,2,2,0,0],{extrapolateRight:'clamp'});
 const style={position:'absolute' as const,inset:0,width,height,filter:`blur(${focus}px)`,transform:locked?'none':`scale(${zoom}) translate(${Math.sin(t*.12)*-12}px,${12-t*1.3}px)`,transformOrigin:'50% 60%'};
 return fallback?<Img src={staticFile('harbor-dawn.png')} alt="" style={{...style,objectFit:'cover'}}/>:<canvas ref={canvas} width={width} height={height} data-water-frame={frame} style={style}/>;
};
