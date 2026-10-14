import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {envelope,Eyebrow,Headline,Icon,palette,Paper,range,serif,Tag} from './Design';
const Source=({delay,x,number,title,id,missing=false}:{delay:number;x:number;number:string;title:string;id:string;missing?:boolean})=>{
 const {fps,width}=useVideoConfig();const t=useCurrentFrame()/fps;const mobile=width<1200;const p=range(t,delay,delay+1.1);
 return <Paper style={{position:'absolute',left:x,top:mobile?700:382,width:280,height:mobile?430:392,padding:28,opacity:p,transform:`perspective(1600px) translate3d(${(1-p)*75}px,${(1-p)*125}px,0) rotateY(${(1-p)*-25-5}deg) rotateX(${(1-p)*8}deg)`}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:38}}><Icon name={missing?'triangle-alert':'file-text'} size={46}/><span style={{fontSize:18,letterSpacing:2,color:palette.coral}}>{number}</span></div>
  <div style={{fontFamily:serif,fontSize:35,lineHeight:1.13,height:90}}>{title}</div>
  <div style={{height:1,background:'#263c4c22',margin:'25px 0'}}/>
  <div style={{fontSize:mobile?25:19,color:palette.muted,marginBottom:20}}>{id}</div>
  <Tag tint={missing?palette.butter:palette.sage}>{missing?'Missing · request evidence':'Source version linked'}</Tag>
 </Paper>;
};
export const Sources=()=>{const {fps,width}=useVideoConfig();const t=useCurrentFrame()/fps;const mobile=width<1200;
 return <AbsoluteFill style={{opacity:envelope(t,5.45)}}>
  <div style={{position:'absolute',left:mobile?80:108,top:mobile?258:245,width:mobile?940:650,translate:`${-35*(1-range(t,0,1))}px 0`}}><Eyebrow>HX-42 / one connected record</Eyebrow><Headline size={mobile?98:92}>Evidence arrives<br/>from every angle.</Headline><p style={{fontSize:mobile?48:29,color:'#FAF7EF',textShadow:'0 1px 4px #182C3A, 0 0 18px #182C3A99',lineHeight:1.4,maxWidth:mobile?840:590,background:mobile?'#182C3AD9':'transparent',padding:mobile?'10px 16px':0,borderLeft:mobile?'3px solid #B85E56':0}}>Keep the source version.<br/>Keep the missing proof visible.</p></div>
  <div style={{position:'absolute',left:mobile?80:842,top:mobile?1190:848,width:mobile?910:932,height:2,background:'#FAF7EF99',scale:`${range(t,.4,2.8)} 1`,transformOrigin:'left'}}/>
  <Source delay={.3} x={mobile?72:832} number="01" title="Product specification" id="SPEC-HX42-v1"/>
  <Source delay={.9} x={mobile?400:1154} number="02" title="Supplier statement" id="SUP-HX42-v1"/>
  <Source delay={1.5} x={mobile?728:1476} number="03" title="Origin evidence" id="ORG-HX42-v1" missing/>
 </AbsoluteFill>;
};
