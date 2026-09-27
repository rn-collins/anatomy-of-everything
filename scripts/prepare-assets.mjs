import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const source=process.argv[2]; if(!source) throw new Error('Pass the Library package directory.');
fs.mkdirSync('assets/chunks',{recursive:true}); const packages=[];
for(const name of fs.readdirSync(source).filter(x=>x.endsWith('.zip')).sort()){
 const bytes=fs.readFileSync(path.join(source,name)); const safe=name.replace(/[^a-zA-Z0-9.-]+/g,'-'); const parts=[];
 for(let at=0,n=0;at<bytes.length;at+=2_000_000,n++){const part=`${safe}.part-${String(n).padStart(3,'0')}`;fs.writeFileSync(path.join('assets/chunks',part),bytes.subarray(at,at+2_000_000));parts.push(part);}
 packages.push({name,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),parts});
}
fs.writeFileSync('assets/package-manifest.json',JSON.stringify({source:'ChatGPT Library',packages},null,2)+'\n');
