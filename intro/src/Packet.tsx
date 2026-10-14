import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {Eyebrow,Headline,Icon,Logo,palette,Paper,range,serif,Tag} from './Design';
export const Packet=()=>{const {fps,width}=useVideoConfig();const t=useCurrentFrame()/fps;const mobile=width<1200;const p=range(t,0,1.05);
 return <AbsoluteFill style={{opacity:p}}>
  <div style={{position:'absolute',left:mobile?80:108,top:mobile?265:270,width:mobile?940:735}}><Eyebrow>Prepared for the next conversation</Eyebrow><Headline>One record.<br/>Its evidence intact.</Headline><p style={{fontSize:mobile?48:29,color:'#FAF7EF',textShadow:'0 1px 4px #182C3A, 0 0 18px #182C3A99',lineHeight:1.4,maxWidth:mobile?850:590,background:mobile?'#182C3AD9':'transparent',padding:mobile?'10px 16px':0,borderLeft:mobile?'3px solid #B85E56':0}}>A source manifest, reviewer reasons,<br/>and the questions still worth asking.</p><div style={{display:'flex',alignItems:'center',gap:14,fontSize:mobile?38:23,color:'#FAF7EF',textShadow:'0 1px 4px #182C3A',marginTop:35,opacity:range(t,.8,1.7)}}><Icon name="arrow-right" size={mobile?40:30}/>Continue to SKUDocket</div></div>
  <Paper style={{position:'absolute',left:mobile?670:1378,top:mobile?820:341,width:290,height:440,padding:30,transform:`perspective(1800px) translateX(${120*(1-range(t,.3,1.4))}px) rotateY(-13deg) rotateZ(8deg)`}}><Icon name="triangle-alert" size={42}/><div style={{fontFamily:serif,fontSize:33,margin:'25px 0'}}>Origin evidence</div><div style={{fontSize:21,marginBottom:24}}>ORG-HX42-v1</div><Tag tint={palette.butter}>Missing</Tag><p style={{fontSize:20,lineHeight:1.45}}>Retained as an open question.</p></Paper>
  <Paper style={{position:'absolute',left:mobile?150:982,top:mobile?728:222,width:530,padding:40,scale:mobile?.82:1,transformOrigin:'left top',transform:`perspective(1800px) translate3d(${80*(1-p)}px,${140*(1-p)}px,0) rotateY(${(1-p)*-20-5}deg) rotateZ(-2deg)`}}>
   <Logo width={234}/><div style={{height:1,background:'#263c4c22',margin:'30px 0'}}/>
   <div style={{fontFamily:serif,fontSize:56,lineHeight:1.1,marginBottom:22}}>DKT-HX42-v1</div><Tag tint="#B85E5618">DRAFT FOR BROKER REVIEW</Tag>
   <div style={{display:'flex',gap:15,alignItems:'center',fontSize:27,lineHeight:1.35,margin:'32px 0',color:palette.ink}}><Icon name="circle-help" size={31}/>Open questions included</div>
   <div style={{borderTop:'1px solid #263c4c22',paddingTop:26,fontSize:23,lineHeight:1.9}}>Source versions linked<br/>Reviewer reasons preserved<br/>Origin proof still missing</div>
   <div style={{marginTop:31,fontSize:17,color:palette.muted,letterSpacing:.6}}>LOCAL DRAFT · NO FILING OR TRANSMISSION</div>
  </Paper>
 </AbsoluteFill>;
};
