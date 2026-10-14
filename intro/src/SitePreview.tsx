import {useCallback,useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player,PlayerRef} from '@remotion/player';
import {HarborIntro} from './Composition';

const IntroPlayer=()=>{
 const ref=useRef<PlayerRef>(null);const host=useRef<HTMLDivElement>(null);
 const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width:900px)').matches);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const [playing,setPlaying]=useState(!reduced);const [finished,setFinished]=useState(false);
 const continueToHero=useCallback(()=>{
  ref.current?.pause();
  const hero=document.getElementById('intro-hero-anchor');
  hero?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
  hero?.focus({preventScroll:true});
 },[reduced]);
 useEffect(()=>{const media=window.matchMedia('(max-width:900px)');const listener=()=>setMobile(media.matches);media.addEventListener('change',listener);return()=>media.removeEventListener('change',listener);},[]);
 useEffect(()=>{const player=ref.current;if(!player)return;
  const play=()=>{setPlaying(true);setFinished(false);};const pause=()=>setPlaying(false);const ended=()=>{setPlaying(false);setFinished(true);continueToHero();};
  player.addEventListener('play',play);player.addEventListener('pause',pause);player.addEventListener('ended',ended);
  if(reduced)player.seekTo(120);
  const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)player.pause();},{threshold:.1});
  if(host.current)observer.observe(host.current);
  const visibility=()=>{if(document.hidden)player.pause();};document.addEventListener('visibilitychange',visibility);
  return()=>{observer.disconnect();player.removeEventListener('play',play);player.removeEventListener('pause',pause);player.removeEventListener('ended',ended);document.removeEventListener('visibilitychange',visibility);};
 },[mobile,reduced,continueToHero]);
 return <div ref={host} className="entry-film-player">
  <Player key={mobile?'mobile':'desktop'} ref={ref} component={HarborIntro} durationInFrames={1080} fps={60}
   compositionWidth={mobile?1080:1920} compositionHeight={mobile?1440:1080} autoPlay={!reduced} initiallyMuted
   style={{width:'100%',aspectRatio:mobile?'3 / 4':'16 / 9'}} controls={false} clickToPlay={false} doubleClickToFullscreen={false}
   spaceKeyToPlayOrPause={false} loop={false} moveToBeginningWhenEnded={false} acknowledgeRemotionLicense/>
  <div className="entry-film-controls" aria-label="Intro playback controls">
   <button type="button" onClick={()=>{if(finished){ref.current?.seekTo(0);ref.current?.play();}else ref.current?.toggle();}} aria-label={playing?'Pause intro':'Play intro'}>{playing?'Pause':'Play'} <span aria-hidden="true">{playing?'Ⅱ':'▷'}</span></button>
   <button type="button" onClick={()=>{ref.current?.seekTo(0);ref.current?.play();}} aria-label="Replay intro">Replay <span aria-hidden="true">↻</span></button>
   <button type="button" className="entry-film-skip" onClick={continueToHero}>Skip to hero <span aria-hidden="true">↓</span></button>
  </div>
 </div>;
};
const element=document.getElementById('entry-film-root');
if(element)createRoot(element).render(<IntroPlayer/>);
