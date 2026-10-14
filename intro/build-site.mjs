import {build} from 'esbuild';
import {readFile,writeFile,cp,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const intro=path.dirname(fileURLToPath(import.meta.url));
const site=path.resolve(intro,'..');
const dist=path.join(site,'dist');
const home=path.join(dist,'index.html');

await mkdir(dist,{recursive:true});
await build({
 entryPoints:[path.join(intro,'src/SitePreview.tsx')],
 bundle:true,
 outfile:path.join(dist,'intro-player.js'),
 format:'iife',
 platform:'browser',
 jsx:'automatic',
 minify:true,
 define:{'process.env.NODE_ENV':'"production"'},
});
await cp(path.join(intro,'public'),path.join(dist,'intro-static'),{recursive:true,force:true});
await cp(path.join(intro,'entry.css'),path.join(dist,'intro-entry.css'),{force:true});

let html=await readFile(home,'utf8');
const once=(from,to)=>{
 if(!html.includes(from))throw new Error(`Home page is missing the intro insertion point: ${from}`);
 html=html.replace(from,to);
};
once('</head>',`<link rel="preload" href="/intro-static/harbor-dawn.png" as="image"><link rel="stylesheet" href="/intro-entry.css"><script>window.remotion_staticBase='/intro-static';</script></head>`);
once('<div class="site-status">','<section class="entry-film" aria-label="Harbor to Dossier — animated introduction"><div id="entry-film-root"></div></section><div class="site-status">');
once('<main id="main">','<main id="main"><div id="intro-hero-anchor" tabindex="-1"></div>');
once('</body>','<script src="/intro-player.js" defer></script></body>');
await writeFile(home,html);
console.log('Integrated Harbor to Dossier before the homepage navigation and hero.');
