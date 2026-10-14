import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {envelope,Eyebrow,Headline,Icon,palette,Paper,range,serif,Tag} from './Design';
const Column=({assembly=false,annotation=0,compact=false}:{assembly?:boolean;annotation?:number;compact?:boolean})=><div style={{boxSizing:'border-box',width:compact?'100%':498,padding:22,background:assembly?'#F7EEE7':'#F2F4EE',borderTop:`3px solid ${assembly?palette.coral:'#718992'}`,borderRadius:3}}>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:17,letterSpacing:1.2,marginBottom:16}}><span>RATIONALE {assembly?'B':'A'}</span><span style={{color:palette.muted}}>Provisional</span></div>
 <div style={{fontFamily:serif,fontSize:compact?46:37,lineHeight:1.12,height:compact?54:82,marginBottom:16}}>{assembly?'Assembly function':'Component construction'}</div>
 <div style={{fontSize:compact?29:21,lineHeight:1.4,color:palette.muted,height:compact?82:58}}>{assembly?'Does the full imported assembly establish the intended function?':'Assess the threaded component and its construction.'}</div>
 <div style={{height:1,background:'#263c4c22',margin:'15px 0'}}/>
 <div style={{fontSize:15,letterSpacing:1.1,color:palette.muted,marginBottom:10}}>SOURCE REFERENCE</div>
 <div style={{fontSize:compact?30:22}}>{assembly?'DRAW-HX42-v1':'SPEC-HX42-v1'}</div>
 <div style={{marginTop:20,opacity:assembly?annotation:1,padding:14,background:assembly?'#B85E5618':'#D6E1D566',fontSize:compact?28:21,lineHeight:1.4,color:assembly?'#98433B':palette.ink}}>{assembly?<><b>Return for evidence</b><br/>Assembly function not established.</>:<>Candidate unassigned.<br/>Human review required.</>}</div>
 </div>;
export const Review=()=>{const {fps,width}=useVideoConfig();const t=useCurrentFrame()/fps;const mobile=width<1200;const p=range(t,0,1.1);
 return <AbsoluteFill style={{opacity:envelope(t,6.0)}}>
  <div style={{position:'absolute',left:mobile?80:108,top:mobile?242:264,width:mobile?940:542}}><Eyebrow>Keep the decision explainable</Eyebrow><Headline size={82}>{mobile?<>Compare the assumption.<br/>Keep the reason.</>:<>Compare the<br/>assumption.<br/>Keep the reason.</>}</Headline><p style={{fontSize:mobile?48:28,color:'#FAF7EF',textShadow:'0 1px 4px #182C3A, 0 0 18px #182C3A99',lineHeight:1.4,maxWidth:mobile?880:460,background:mobile?'#182C3AD9':'transparent',padding:mobile?'10px 16px':0,borderLeft:mobile?'3px solid #B85E56':0}}>Two plausible rationales.<br/>One question for human review.</p></div>
  <Paper style={{position:'absolute',left:mobile?80:714,top:mobile?615:218,width:mobile?920:1096,padding:30,transform:`perspective(2000px) translate3d(${(1-p)*160}px,${(1-p)*100}px,0) rotateY(${(1-p)*-16+Math.sin(t*.3)*2.2}deg) rotateX(${(1-p)*8}deg)`,transformOrigin:mobile?'left top':'center',scale:.88+.12*p+.022*range(t,1,5)}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:20,marginBottom:18}}><span>HX-42 / Evidence dossier</span><Tag>01 OCT 2026 · SIMULATED</Tag></div>
   <div style={{fontFamily:serif,fontSize:36,lineHeight:1.12,marginBottom:18}}>Compare the assumption, not just the field.</div>
   <div style={{display:'flex',gap:16,alignItems:'center',padding:'14px 20px',background:palette.butter,fontSize:mobile?28:20,marginBottom:20}}><Icon name="triangle-alert" size={26}/>Origin evidence missing · eligibility not assessed</div>
   <div style={{display:'flex',gap:28}}>{mobile?<Column assembly compact annotation={range(t,1.6,2.3)}/>:<><Column/><Column assembly annotation={range(t,1.6,2.3)}/></>}</div>
   {!mobile&&<div style={{display:'flex',alignItems:'center',gap:12,marginTop:20,fontSize:20,opacity:range(t,2.5,3.1)}}><Icon name="rotate-ccw" size={24}/><span>Reviewer reason preserved · previous version retained</span></div>}
  </Paper>
 </AbsoluteFill>;
};
