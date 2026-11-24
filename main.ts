import{mkdirSync as M,readFileSync as R,readdirSync as D,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
const E=process.env,I=E.MAKEFUN_INPUT_DIR??'/input',O=E.MAKEFUN_OUTPUT_DIR??'/output',A=Int32Array;
const T='01146:;?0000000099999995999599909990000000000000044000000000000058000000000000004414';
const F=[(a,b)=>a+b|0,(a,b)=>a-b|0,Math.imul,(a,b)=>b?(a/b)|0:NaN,(a,b)=>b?a%b:NaN,(a,b)=>b?(a>>>0)/(b>>>0)|0:NaN,(a,b)=>b?(a>>>0)%(b>>>0)|0:NaN,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31)|0,0,(a,b)=>a==b,(a,b)=>a<b,(a,b)=>(a>>>0)<(b>>>0)];
function run(p,q){
const s=new A(256),c=new A(64),m=new A(256),o=[];
let sp=0,cp=0,pc=0,n=0,ip=0,op,L,k,nd,pu,npc,a,b,r,v,t,j;
for(;;){
if(n>=1e6)return[o,10];
if(pc<0|pc>=p.length)return[o,9];
op=p[pc];
L=op==1?1:op==2?4:op>47&&op<52?2:0;
if(L&&pc+L>=p.length)return[o,9];
n++;
k=T.charCodeAt(op)-48;nd=k>>2;pu=k&3;
if(sp<nd)return[o,2];
if(sp-nd+pu>256)return[o,3];
npc=pc+1+L;
if(nd==2&&pu==1){b=s[--sp];a=s[--sp];r=F[op-16](a,b);if(r!=r)return[o,4];s[sp++]=r;pc=npc;continue}
switch(op){
case 0:return[o,0];
case 1:s[sp++]=p.readInt8(pc+1);break;
case 2:s[sp++]=p.readInt32LE(pc+1);break;
case 3:sp--;break;
case 4:s[sp]=s[sp-1];sp++;break;
case 5:t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t;break;
case 6:s[sp]=s[sp-2];sp++;break;
case 7:[s[sp-3],s[sp-2],s[sp-1]]=[s[sp-2],s[sp-1],s[sp-3]];break;
case 23:case 27:a=s[--sp];s[sp++]=op==23?-a|0:~a;break;
case 48:case 49:case 50:v=op>48?s[--sp]:0;j=p.readInt16LE(pc+1);pc=op==48|(op==49)==(v==0)?npc+j:npc;continue;
case 51:if(cp>=64)return[o,7];c[cp++]=npc;pc=p[pc+1]|p[pc+2]<<8;continue;
case 52:if(!cp)return[o,8];pc=c[--cp];continue;
case 64:a=s[--sp];if(a>>>0>255)return[o,6];s[sp++]=m[a];break;
case 65:a=s[--sp];v=s[--sp];if(a>>>0>255)return[o,6];m[a]=v;break;
case 80:v=s[--sp];t=''+v;if(o.length+t.length>65536)return[o,11];o.push(...Buffer.from(t));break;
case 81:v=s[--sp];if(o.length>65535)return[o,11];o.push(v&255);break;
case 82:s[sp++]=ip<q.length?q[ip++]:-1;break;
case 83:v=s[--sp];return[o,v&255];
default:return[o,5];
}
pc=npc;
}
}
for(const x of D(I).sort()){let p,q;try{p=R(J(I,x,'program.bin'))}catch{p=Buffer.alloc(0)}try{q=R(J(I,x,'input.bin'))}catch{q=Buffer.alloc(0)}const[o,e]=run(p,q);M(J(O,x),{recursive:true});W(J(O,x,'stdout.bin'),Buffer.from(o));W(J(O,x,'exit.txt'),e+'\n')}
