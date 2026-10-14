import {execFileSync} from 'node:child_process';
import {existsSync} from 'node:fs';

const run=(command,args)=>execFileSync(command,args,{stdio:'inherit'});
if(!existsSync('intro/node_modules/esbuild')||!existsSync('intro/node_modules/@remotion/player')){
 run('npm',['ci','--prefix','intro','--no-audit','--no-fund']);
}
run('python3',['build.py']);
run('node',['intro/build-site.mjs']);
run('python3',['src/check_site.py']);
