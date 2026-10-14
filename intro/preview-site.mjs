import {build} from 'esbuild';
import http from 'node:http';
import {readFile,stat,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const website=path.resolve(root,'../skudocket-website/dist');
await mkdir(path.join(root,'site-preview'),{recursive:true});
await build({entryPoints:[path.join(root,'src/SitePreview.tsx')],bundle:true,outfile:path.join(root,'site-preview/intro.js'),format:'iife',platform:'browser',jsx:'automatic',minify:true,define:{'process.env.NODE_ENV':'"production"'}});
const style=`
.entry-film{background:#FAF7EF;position:relative;isolation:isolate;border-bottom:1px solid #263C4C22}
.entry-film-player{position:relative;max-width:1920px;margin:auto;overflow:hidden}
.entry-film-controls{position:absolute;right:5.4%;bottom:10.2%;display:flex;gap:10px;z-index:5}
.entry-film-controls button{font:500 14px 'Public Sans',sans-serif;cursor:pointer;border:1px solid #FAF7EF55;border-radius:4px;background:#263C4CEB;color:#FAF7EF;padding:13px 17px;display:flex;gap:18px;align-items:center;box-shadow:0 3px 14px #182C3A15;transition:background .15s,translate .15s}
.entry-film-controls button:hover{background:#182C3A;translate:0 -2px}
.entry-film-controls button:focus-visible{outline:3px solid #B85E56;outline-offset:4px}
.entry-film-controls .entry-film-skip{background:#FAF7EF;color:#263C4C;border-color:#FAF7EF}
.entry-film-controls .entry-film-skip:hover{background:#F0E4BA}
#intro-hero-anchor{scroll-margin-top:0;outline:none}
@media(max-width:700px){.entry-film-controls{left:7.4%;right:7.4%;bottom:9%;gap:8px;justify-content:space-between}.entry-film-controls button{font-size:12px;padding:10px 12px;gap:9px}}
@media(prefers-reduced-motion:reduce){.entry-film-controls button{transition:none}}
`;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.mp4':'video/mp4','.ico':'image/x-icon','.json':'application/json'};
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost:3089');let pathname=decodeURIComponent(url.pathname);
  let base=website;
  if(pathname.startsWith('/intro-static/')){base=path.join(root,'public');pathname=pathname.slice('/intro-static'.length);}
  if(pathname==='/intro-player.js'){res.setHeader('Content-Type',types['.js']);res.end(await readFile(path.join(root,'site-preview/intro.js')));return;}
  let file=path.resolve(base,'.'+pathname);
  if(!file.startsWith(base+path.sep)&&file!==base){res.writeHead(403);res.end();return;}
  let info=await stat(file);if(info.isDirectory()){file=path.join(file,'index.html');info=await stat(file);}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  if(file===path.join(website,'index.html')){
   let html=await readFile(file,'utf8');
   html=html.replace('</head>',`<style>${style}</style><script>window.remotion_staticBase='/intro-static';</script></head>`);
   html=html.replace('<div class="site-status">','<section class="entry-film" aria-label="Harbor to Dossier — animated introduction"><div id="entry-film-root"></div></section><div class="site-status">');
   html=html.replace('<main id="main">','<main id="main"><div id="intro-hero-anchor" tabindex="-1"></div>');
   html=html.replace('</body>','<script src="/intro-player.js" defer></script></body>');res.end(html);return;
  }
  res.end(await readFile(file));
 }catch(error){res.writeHead(404);res.end('Not found');}
}).listen(3089,'127.0.0.1',()=>console.log('SKUDocket intro website preview: http://localhost:3089'));
