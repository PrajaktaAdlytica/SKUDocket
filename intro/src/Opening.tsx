import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {envelope,Eyebrow,Headline,range} from './Design';
export const Opening=()=>{const f=useCurrentFrame();const {fps,width}=useVideoConfig();const t=f/fps;const mobile=width<1200;
 return <AbsoluteFill style={{opacity:envelope(t,4.25)}}>
  <div style={{position:'absolute',left:mobile?80:108,top:mobile?275:256,width:mobile?940:820,translate:`0 ${32*(1-range(t,.15,1.5))}px`}}>
   <Eyebrow>Evidence before the next entry</Eyebrow>
   <Headline size={mobile?104:100}>Every shipment<br/>starts with evidence.</Headline>
   <div style={{marginTop:32,fontSize:mobile?48:30,color:'#FAF7EF',textShadow:'0 1px 4px #182C3A, 0 0 18px #182C3A99',lineHeight:1.4,maxWidth:mobile?900:650,background:mobile?'#182C3AD9':'transparent',padding:mobile?'10px 16px':0,borderLeft:mobile?'3px solid #B85E56':0}}>The facts, the gaps, and the reasoning<br/>behind your next broker conversation.</div>
   <div style={{width:80,height:3,background:'#B85E56',marginTop:40,scale:`${range(t,.8,2)} 1`,transformOrigin:'left'}}/>
  </div>
 </AbsoluteFill>;
};
