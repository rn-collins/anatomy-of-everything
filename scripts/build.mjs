import fs from 'node:fs'; import path from 'node:path';
fs.rmSync('dist',{recursive:true,force:true}); fs.cpSync('public','dist',{recursive:true});
const manifest=JSON.parse(fs.readFileSync('assets/package-manifest.json','utf8'));
fs.mkdirSync('dist/packages',{recursive:true});
for(const item of manifest.packages){const out=fs.openSync(path.join('dist/packages',item.name),'w'); for(const part of item.parts){fs.writeSync(out,fs.readFileSync(path.join('assets/chunks',part)));} fs.closeSync(out);}
