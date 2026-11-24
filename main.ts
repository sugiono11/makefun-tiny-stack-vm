import{mkdirSync as M,readFileSync as R,readdirSync as D,writeFileSync as W}from'fs';
const E=process.env,I=(E.MAKEFUN_INPUT_DIR||'/input')+'/',O=(E.MAKEFUN_OUTPUT_DIR||'/output')+'/',A=Int32Array,Z=[];
let o;
const T='01146:;?0000000099999995999599909990000000000000044000000000000058000000000000004414';
function run(p,q){
const s=new A(256),c=new A(64),m=new A(256);o=[];
let sp=0,cp=0,pc=0,n=0,ip=0,op,L,k,nd,pu,a,r,t;
for(;;){
if(n==1e6)return 10;
op=p[pc];
L=op==1?1:op==2?4:op>47&&op<52?2:0;
if(pc<0|pc+L>=p.length)return 9;
pc+=1+L;n++;
k=T.charCodeAt(op)-48;nd=k>>2;pu=k&3;
if(sp<nd)return 2;
if(sp-nd+pu>256)return 3;
if(k==9){op-=16;t=s[--sp];a=s[--sp];s[sp++]=r=op==0?a+t:op==1?a-t:op==2?Math.imul(a,t):op==3?t?a/t:NaN:op==4?a%t:op==5?t?(a>>>0)/(t>>>0):NaN:op==6?(a>>>0)%(t>>>0):op==8?a&t:op==9?a|t:op==10?a^t:op==12?a<<(t&31):op==13?a>>(t&31):op==14?a>>>(t&31):op==16?a==t:op==17?a<t:(a>>>0)<(t>>>0);if(r!=r)return 4;continue}
switch(op){
case 0:return 0;
case 1:case 2:s[sp++]=op==1?p.readInt8(pc-1):p.readInt32LE(pc-4);break;
case 3:sp--;break;
case 4:case 6:s[sp++]=s[sp-op/2];break;
case 5:t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t;break;
case 7:[s[sp-3],s[sp-2],s[sp-1]]=[s[sp-2],s[sp-1],s[sp-3]];break;
case 23:case 27:a=s[--sp];s[sp++]=-a-(op==27);break;
case 48:case 49:case 50:a=nd?s[--sp]:0;if(op==48|(op==49)==(a==0))pc+=p.readInt16LE(pc-2);continue;
case 51:if(cp>=64)return 7;c[cp++]=pc;pc=p[pc-2]|p[pc-1]<<8;continue;
case 52:if(!cp)return 8;pc=c[--cp];continue;
case 64:case 65:a=s[--sp];if(a>>>0>255)return 6;op==64?s[sp++]=m[a]:m[a]=s[--sp];break;
case 80:t=''+s[--sp];if(o.length+t.length>65536)return 11;o.push(...Buffer.from(t));break;
case 81:if(o.length>65535)return 11;o.push(s[--sp]&255);break;
case 82:s[sp++]=q[ip++]??-1;break;
case 83:return s[--sp]&255;
default:return 5;
}
}
}
D(I).map(x=>{let p=R(I+x+'/program.bin'),q;try{q=R(I+x+'/input.bin')}catch{q=Z}const e=run(p,q);M(O+x,{recursive:true});W(O+x+'/stdout.bin',Buffer.from(o));W(O+x+'/exit.txt',e+'\n')});
