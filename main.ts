import F from'fs';const{mkdirSync:M,readFileSync:R,readdirSync:D,writeFileSync:W}=F;
const E=process.env,I=(E.MAKEFUN_INPUT_DIR||'/input')+'/',O=(E.MAKEFUN_OUTPUT_DIR||'/output')+'/',A=Int32Array;
let o;
const T='0Aq46:;?0000000099999995999599909990000000000000PTTP00000000000058000000000000004414';
function run(p,q){
const s=new A(256),c=[],m=new A(256);o='';
for(let sp=0,cp=0,pc=0,n=0,ip=0,op,k,nd,pu,a,r,t,u,v;;){
if(n++==1e6)return 10;
op=p[pc];
k=T.charCodeAt(op)-48;nd=k/4&3;pu=k&3;
if(pc<0|pc+(k>>4)>=p.length)return 9;
pc+=1+(k>>4);
if(sp<nd|sp-nd+pu>256)return 2+(sp>=nd);
if(k==9){op-=16;t=s[--sp];a=s[--sp];u=a>>>0;v=t>>>0;s[sp++]=r=op<2?a+(op?-t:t):op<3?Math.imul(a,t):op<4?t?a/t:NaN:op<5?a%t:op<6?v?u/v:NaN:op<7?u%v:op<9?a&t:op<10?a|t:op<11?a^t:op<13?a<<t:op<14?a>>t:op<15?a>>>t:op<17?a==t:op<18?a<t:u<v;if(r!=r)return 4;continue}
if(!op)return 0;
if(op<3){s[sp++]=op<2?p[pc-1]<<24>>24:p.readInt32LE(pc-4)}else if(op<8){pu>nd?s[sp++]=s[sp+~nd]:pu<nd?sp--:(u=sp-nd,t=s[u],s.copyWithin(u,u+1),s[sp-1]=t)}else switch(op){
case 23:case 27:a=s[--sp];s[sp++]=-a-(op>23);break;
case 51:if(cp>63)return 7;c[cp++]=pc;pc=p[pc-2]|p[pc-1]<<8;break;
case 52:if(!cp)return 8;pc=c[--cp];break;
case 64:case 65:a=s[--sp];if(a&~255)return 6;op<65?s[sp++]=m[a]:m[a]=s[--sp];break;
case 80:case 81:t=op<81?''+s[--sp]:String.fromCharCode(s[--sp]);if(o.length+t.length>65536)return 11;o+=t;break;
case 82:s[sp++]=q[ip++]??-1;break;
case 83:return s[--sp]&255;
default:return 5;
case 48:case 49:case 50:a=nd?s[--sp]:0;if(op<49|!a==(op<50))pc+=p.readInt16LE(pc-2);
}
}
}
D(I).map(x=>{let q;try{q=R(I+x+'/input.bin')}catch{q=[]}M(O+x,{recursive:true});W(O+x+'/exit.txt',run(R(I+x+'/program.bin'),q)+'');W(O+x+'/stdout.bin',Buffer.from(o,'latin1'))});
