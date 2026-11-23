import {mkdirSync,readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input';
const O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
// Run one program: p is program.bin, q is input.bin. Returns [output bytes, exit code].
function run(p,q){
 const s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=[];
 let sp=0,cp=0,pc=0,n=0,ip=0;
 for(;;){
  if(n>=1000000)return[o,10];
  if(pc<0||pc>=p.length)return[o,9];
  const op=p[pc];
  const kn=op<=7||(op>=16&&op<=30)||(op>=32&&op<=34)||(op>=48&&op<=52)||op===64||op===65||(op>=80&&op<=83);
  if(!kn)return[o,5];
  const L=op===1?1:op===2?4:op>=48&&op<=51?2:0;
  if(L&&pc+L>=p.length)return[o,9];
  n++;
  let nd=0,pu=0;
  if(op===3||op===4||op===23||op===27||op===49||op===50||op===64||op===80||op===81||op===83)nd=1;
  else if(op===5||op===6||op===65||(op>=16&&op<=22)||(op>=24&&op<=30)||(op>=32&&op<=34))nd=2;
  else if(op===7)nd=3;
  if(op===1||op===2||op===82||(op>=16&&op<=30)||(op>=32&&op<=34)||op===64)pu=1;
  else if(op===4||op===5)pu=2;
  else if(op===6||op===7)pu=3;
  if(sp<nd)return[o,2];
  if(sp-nd+pu>256)return[o,3];
  const npc=pc+1+L;
  let a,b,r,v,t;
  if(op===23||op===27){
   a=s[--sp];s[sp++]=op===23?(-a)|0:~a;pc=npc;continue;
  }
  if(op>=16&&op<=22||op>=24&&op<=30||op>=32&&op<=34){
   b=s[--sp];a=s[--sp];
   if(op===16)r=(a+b)|0;
   else if(op===17)r=(a-b)|0;
   else if(op===18)r=Math.imul(a,b);
   else if(op===19){if(!b)return[o,4];r=(a/b)|0}
   else if(op===20){if(!b)return[o,4];r=a%b}
   else if(op===21){if(!b)return[o,4];r=Math.floor((a>>>0)/(b>>>0))|0}
   else if(op===22){if(!b)return[o,4];r=((a>>>0)%(b>>>0))|0}
   else if(op===23)r=(-a)|0;
   else if(op===24)r=a&b;
   else if(op===25)r=a|b;
   else if(op===26)r=a^b;
   else if(op===27)r=~a;
   else if(op===28)r=a<<(b&31);
   else if(op===29)r=a>>(b&31);
   else if(op===30)r=(a>>>(b&31))|0;
   else if(op===32)r=a===b?1:0;
   else if(op===33)r=a<b?1:0;
   else r=(a>>>0)<(b>>>0)?1:0;
   s[sp++]=r;pc=npc;continue;
  }
  switch(op){
   case 0:return[o,0];
   case 1:s[sp++]=(p[pc+1]<<24)>>24;break;
   case 2:s[sp++]=(p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24)|0;break;
   case 3:sp--;break;
   case 4:s[sp]=s[sp-1];sp++;break;
   case 5:t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t;break;
   case 6:s[sp]=s[sp-2];sp++;break;
   case 7:t=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=t;break;
   case 48:{let j=p[pc+1]|p[pc+2]<<8;if(j>=32768)j-=65536;pc=npc+j;continue}
   case 49:v=s[--sp];{let j=p[pc+1]|p[pc+2]<<8;if(j>=32768)j-=65536;pc=v===0?npc+j:npc;continue}
   case 50:v=s[--sp];{let j=p[pc+1]|p[pc+2]<<8;if(j>=32768)j-=65536;pc=v!==0?npc+j:npc;continue}
   case 51:if(cp>=64)return[o,7];c[cp++]=npc;pc=p[pc+1]|p[pc+2]<<8;continue;
   case 52:if(!cp)return[o,8];pc=c[--cp];continue;
   case 64:a=s[--sp];if(a<0||a>255)return[o,6];s[sp++]=m[a];break;
   case 65:a=s[--sp];v=s[--sp];if(a<0||a>255)return[o,6];m[a]=v;break;
   case 80:v=s[--sp];t=String(v);if(o.length+t.length>65536)return[o,11];for(let i=0;i<t.length;i++)o.push(t.charCodeAt(i));break;
   case 81:v=s[--sp];if(o.length>=65536)return[o,11];o.push(v&255);break;
   case 82:s[sp++]=ip<q.length?q[ip++]:-1;break;
   case 83:v=s[--sp];return[o,v&255];
  }
  pc=npc;
 }
}
for(const id of readdirSync(I).sort()){
 let p,q;
 try{p=readFileSync(join(I,id,'program.bin'))}catch{p=Buffer.alloc(0)}
 try{q=readFileSync(join(I,id,'input.bin'))}catch{q=Buffer.alloc(0)}
 const[o,code]=run(p,q);
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),Buffer.from(o));
 writeFileSync(join(O,id,'exit.txt'),String(code)+'\n');
}
