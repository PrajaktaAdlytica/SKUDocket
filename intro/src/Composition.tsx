import {AbsoluteFill,Composition,Folder,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {WaterPlate} from './WaterPlate';
import {Logo,palette,range} from './Design';
import {Opening} from './Opening';
import {Sources} from './Sources';
import {Review} from './Review';
import {Packet} from './Packet';

export const HarborIntro=()=>{const {fps,width}=useVideoConfig();const t=useCurrentFrame()/fps;const mobile=width<1200;
 return <AbsoluteFill style={{background:palette.cream,fontFamily:'"Public Sans", sans-serif',color:palette.ink,overflow:'hidden'}}>
  <WaterPlate/>
  <Sequence name="Dawn harbor / crane and dolly" durationInFrames={4.25*fps} premountFor={fps}><Opening/></Sequence>
  <Sequence name="Sources / sequential depth reveal" from={3.8*fps} durationInFrames={5.45*fps} premountFor={fps}><Sources/></Sequence>
  <Sequence name="Review / orbit into the rationale" from={8.45*fps} durationInFrames={6*fps} premountFor={fps}><Review/></Sequence>
  <Sequence name="Packet / pull back and handoff" from={13.85*fps} durationInFrames={4.15*fps} premountFor={fps}><Packet/></Sequence>
  <div style={{position:'absolute',left:mobile?80:108,top:73}}><Logo width={mobile?260:284}/></div>
  <div style={{position:'absolute',right:mobile?80:104,top:79,fontSize:mobile?23:18,letterSpacing:2.3,padding:'13px 18px',background:'#FAF7EFD9',border:'1px solid #263c4c2a',borderRadius:3}}>DEMO — SYNTHETIC DATA</div>
  <div style={{position:'absolute',left:mobile?80:108,bottom:65,color:'#FAF7EF',fontSize:mobile?21:17,letterSpacing:2.4,textShadow:'0 2px 10px #182c3a'}}>HARBOR TO DOSSIER <span style={{opacity:.6,margin:'0 18px'}}>/</span> CONCEPT PREVIEW</div>
  <div style={{position:'absolute',right:mobile?80:104,bottom:66,fontSize:mobile?23:19,color:palette.cream,letterSpacing:.6,textShadow:'0 2px 10px #182c3a'}}>{t<3.8?'01 / COLLECT':t<8.45?'02 / CONNECT':t<13.85?'03 / REVIEW':'04 / ASSEMBLE'}</div>
  <div style={{position:'absolute',bottom:42,left:mobile?80:108,right:mobile?80:104,height:2,background:'#faf7ef44'}}><div style={{height:'100%',background:palette.cream,width:`${range(t,0,18)*100}%`}}/></div>
 </AbsoluteFill>;
};
export const WaterStudy=()=> <WaterPlate locked/>;
export const MyComposition=()=> <>
 <Composition id="HarborToDossier" component={HarborIntro} width={1920} height={1080} fps={60} durationInFrames={1080}/>
 <Composition id="HarborToDossierMobile" component={HarborIntro} width={1080} height={1440} fps={60} durationInFrames={1080}/>
 <Folder name="Shots">
  <Composition id="Opening" component={Opening} width={1920} height={1080} fps={60} durationInFrames={255}/>
  <Composition id="Sources" component={Sources} width={1920} height={1080} fps={60} durationInFrames={327}/>
  <Composition id="Review" component={Review} width={1920} height={1080} fps={60} durationInFrames={360}/>
  <Composition id="Packet" component={Packet} width={1920} height={1080} fps={60} durationInFrames={249}/>
  <Composition id="WaterMotionStudy" component={WaterStudy} width={1920} height={1080} fps={60} durationInFrames={1080}/>
 </Folder>
</>;
