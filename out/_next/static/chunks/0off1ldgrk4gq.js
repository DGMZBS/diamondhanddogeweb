(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(89970),o=e.i(46854);function i({onComplete:e}){let r=(0,a.useRef)(null),s=(0,a.useRef)(null),l=(0,a.useRef)(0),c=(0,a.useRef)(null),d=(0,a.useRef)(null),[p,h]=(0,a.useState)(!1),x=(0,a.useRef)(!1),u=(t=!1)=>{x.current||(x.current=!0,cancelAnimationFrame(l.current),c.current?.kill(),n.gsap.to(s.current,{opacity:0,duration:t?.3:.6,ease:"power2.inOut",onComplete:e}))};return(0,a.useEffect)(()=>{let e=r.current,t=s.current;if(!e||!t)return;let a=window.innerWidth<768,i=()=>{if(e.width=window.innerWidth,e.height=window.innerHeight,d.current){let t=d.current;t.cartY=.58*e.height,t.tntX=.75*e.width,t.explosionX=.75*e.width,t.explosionY=.5*e.height,t.pedestalX=.52*e.width,t.pedestalY=.48*e.height}};e.width=window.innerWidth,e.height=window.innerHeight,window.addEventListener("resize",i);let p=(0,o.createInitialState)(e.width,e.height);d.current=p;let x=e.getContext("2d");if(!x)return;let m=()=>{x.clearRect(0,0,e.width,e.height),(0,o.drawScene)(x,e.width,e.height,p),l.current=requestAnimationFrame(m)};l.current=requestAnimationFrame(m);let g=setTimeout(()=>h(!0),1500),f=n.gsap.timeline();c.current=f,n.gsap.to(p,{wheelAngle:2*Math.PI,duration:.7,ease:"none",repeat:-1,modifiers:{wheelAngle:e=>parseFloat(e)%(2*Math.PI)}}),n.gsap.to(p,{cartBobY:5,duration:.3,ease:"sine.inOut",yoyo:!0,repeat:-1}),n.gsap.to(p,{lantern1:.6,duration:.28,yoyo:!0,repeat:-1,ease:"none"}),n.gsap.to(p,{lantern2:.5,duration:.42,yoyo:!0,repeat:-1,ease:"none",delay:.15}),n.gsap.to(p,{lantern3:.7,duration:.33,yoyo:!0,repeat:-1,ease:"none",delay:.08}),n.gsap.to(p,{crystal1:1,duration:3.2,yoyo:!0,repeat:-1,ease:"sine.inOut"}),n.gsap.to(p,{crystal2:1,duration:2.8,yoyo:!0,repeat:-1,ease:"sine.inOut",delay:.8}),n.gsap.to(p,{crystal3:1,duration:3.6,yoyo:!0,repeat:-1,ease:"sine.inOut",delay:1.6}),n.gsap.to(p,{crystal4:1,duration:3,yoyo:!0,repeat:-1,ease:"sine.inOut",delay:2.4});let y=(e,t,a)=>{let o=0,i=n.gsap.ticker.add((r,s)=>{let l=s/1e3;o+=l,e.x+=e.vx*l,e.vy+=t*l,e.y+=e.vy*l,e.rotation+=e.rotSpeed*l,e.opacity=Math.max(0,1-o/a),o>a&&n.gsap.ticker.remove(i)});return i};return f.addLabel("enter",0),f.to(p,{cartX:e.width+320,duration:4.3,ease:"none"},"enter"),f.addLabel("rocks",.5),(a?[{xFrac:.25,delay:0,size:55},{xFrac:.45,delay:.2,size:70},{xFrac:.18,delay:.38,size:48},{xFrac:.38,delay:.54,size:62}]:[{xFrac:.22,delay:0,size:58},{xFrac:.4,delay:.14,size:72},{xFrac:.16,delay:.25,size:50},{xFrac:.54,delay:.35,size:80},{xFrac:.32,delay:.44,size:64},{xFrac:.46,delay:.53,size:55}]).forEach(t=>{f.call(()=>{let a={x:e.width*t.xFrac+(Math.random()-.5)*24,y:-80-40*Math.random(),rotation:Math.random()*Math.PI,size:t.size,speedY:0,opacity:1,hit:!1,puffProgress:0};p.rocks.push(a),n.gsap.to(a,{y:.6*e.height+18*Math.random(),rotation:a.rotation+Math.PI*(2+Math.random()),duration:.32+.1*Math.random(),ease:"power4.in",onComplete:()=>{a.hit=!0,n.gsap.to(a,{puffProgress:1,duration:.28,ease:"power1.out"}),n.gsap.to(p,{keyframes:[{shakeX:-10,shakeY:-6,duration:.04},{shakeX:10,shakeY:5,duration:.04},{shakeX:-6,shakeY:-3,duration:.04},{shakeX:0,shakeY:0,duration:.04}]})}}),p.dogeExpression="scared",n.gsap.to(p,{cartBobY:-24,duration:.15,ease:"power3.out",onComplete:()=>{n.gsap.to(p,{cartBobY:0,duration:.2,ease:"power2.in"})}}),setTimeout(()=>{p.dogeExpression="confident"},280)},[],`rocks+=${t.delay}`)}),f.addLabel("tnt",1.4),f.call(()=>{p.tntVisible=!0,p.tntX=.78*e.width,p.fuseLength=1,p.dogeExpression="scared"},[],"tnt"),f.to(p,{fuseLength:0,duration:.55,ease:"none"},"tnt"),f.addLabel("explode",2),f.call(()=>{p.tntVisible=!1,p.explosionActive=!0,p.explosionProgress=0,p.explosionX=.78*e.width,p.explosionY=.5*e.height;let t=[.34,.48,.62,.78];t.forEach((o,i)=>{let r=i===t.length-1;setTimeout(()=>{if(!r){let t={x:e.width*o,fuseLength:1,exploded:!0};p.trailingTNTs.push(t)}let t={x:e.width*o,y:.5*e.height,progress:0};p.secondaryExplosions.push(t),n.gsap.to(t,{progress:1,duration:.4,ease:"power2.out"}),n.gsap.to(p,{railIntactFromX:e.width*o+20,duration:.18,ease:"power3.out"}),(t=>{let n=a?5:8;for(let a=0;a<n;a++){let a=-(.8*Math.PI)-Math.random()*Math.PI*.6,n=280+220*Math.random(),o={x:t+(Math.random()-.5)*80,y:.66*e.height,vx:Math.cos(a)*n,vy:Math.sin(a)*n,rotation:Math.random()*Math.PI*2,rotSpeed:(Math.random()-.5)*12,opacity:1,width:35+25*Math.random(),height:10+6*Math.random(),launched:!0};p.bridgeSegments.push(o),y(o,420,1.2)}let o=a?3:5;for(let a=0;a<o;a++){let a=-(.5*Math.PI)+(Math.random()-.5)*Math.PI*.9,n=220+280*Math.random(),o={x:t+(Math.random()-.5)*60,y:.655*e.height,vx:Math.cos(a)*n,vy:Math.sin(a)*n,rotation:Math.random()*Math.PI,rotSpeed:(Math.random()-.5)*8,opacity:1,width:60+50*Math.random(),height:6+3*Math.random(),launched:!0};p.railSegments.push(o),y(o,380,1.5)}})(e.width*o),n.gsap.to(p,{keyframes:[{shakeX:-(10-2*i),shakeY:-(5-i),duration:.04},{shakeX:12-2*i,shakeY:4-i,duration:.04},{shakeX:-(7-i),shakeY:-2,duration:.04},{shakeX:0,shakeY:0,duration:.04}]})},260*i)})},[],"explode"),f.to(p,{explosionProgress:1,duration:.42,ease:"power2.out"},"explode"),f.to(p,{keyframes:[{shakeX:-18,shakeY:-9,duration:.04},{shakeX:20,shakeY:8,duration:.04},{shakeX:-14,shakeY:-6,duration:.04},{shakeX:16,shakeY:5,duration:.04},{shakeX:-9,shakeY:-3,duration:.04},{shakeX:8,shakeY:2,duration:.04},{shakeX:-4,shakeY:-1,duration:.04},{shakeX:0,shakeY:0,duration:.04}]},"explode"),f.call(()=>{for(let t=0;t<(a?3:5);t++){let t={x:e.width*(.5+.3*Math.random()),y:.62*e.height,rotation:Math.random()*Math.PI,size:35+30*Math.random(),speedY:0,opacity:1,hit:!1,puffProgress:0};p.rocks.push(t),n.gsap.to(t,{y:.2*e.height+Math.random()*e.height*.2,x:t.x+(Math.random()-.5)*200,rotation:t.rotation+4*Math.PI,duration:.55+.2*Math.random(),ease:"power2.out",onComplete:()=>{n.gsap.to(t,{opacity:0,duration:.3})}})}},[],"explode+=0.05"),f.call(()=>{p.explosionActive=!1,p.dogeExpression="confident"},[],"explode+=0.5"),f.addLabel("escape",2.9),f.call(()=>{p.dogeExpression="scared",p.rocks=[]},[],"escape"),f.addLabel("fadeOut",3.4),f.to(p,{fadeOverlay:1,duration:.24,ease:"power2.in"},"fadeOut"),f.call(()=>{p.scene="entrance",p.entranceCartX=-280,p.dogeExpression="confident",p.cartBobY=0,p.rocks=[],p.bridgeSegments=[],p.railSegments=[],p.railIntactFromX=0,p.trailingTNTs=[],p.secondaryExplosions=[]},[],"fadeOut+=0.25"),f.addLabel("fadeIn",3.85),f.to(p,{fadeOverlay:0,duration:.35,ease:"power2.out"},"fadeIn"),n.gsap.to(p,{entranceGlow:1,duration:1.1,yoyo:!0,repeat:-1,ease:"sine.inOut",delay:3.85}),f.addLabel("approach",4.1),f.to(p,{entranceCartX:.38*e.width,duration:1,ease:"power2.out"},"approach"),f.to(p,{entranceCartX:.35*e.width,duration:.5,ease:"power3.out"}),f.call(()=>{p.dogeExpression="awe"},[],"+=0.1"),f.addLabel("holdForCoin",5.8),f.call(()=>{p.coinVisible=!0,p.coinX=.5*e.width,p.coinY=.42*e.height,p.coinScale=.12,p.coinOpacity=0,p.coinSpin=0},[],"holdForCoin+=0.2"),f.to(p,{coinOpacity:1,coinScale:1.15,coinY:.38*e.height,duration:.55,ease:"back.out(1.4)"},"holdForCoin+=0.2"),f.to(p,{coinSpin:3,duration:.9,ease:"power2.out"},"holdForCoin+=0.2"),f.to(p,{coinScale:1,coinY:.4*e.height,duration:.35,ease:"power2.inOut"},"holdForCoin+=0.75"),f.call(()=>{n.gsap.to(p,{coinY:p.coinY-8,duration:1.1,ease:"sine.inOut",yoyo:!0,repeat:-1}),n.gsap.to(p,{coinSpin:p.coinSpin+20,duration:14,ease:"none",repeat:-1})},[],"holdForCoin+=1.1"),f.addLabel("welcomeText","holdForCoin+=1.3"),f.to(p,{welcomeTextOpacity:1,duration:.55,ease:"power2.out"},"welcomeText"),f.to(p,{welcomeSubOpacity:1,duration:.45,ease:"power2.out"},"welcomeText+=0.38"),f.addLabel("endHold","holdForCoin+=3.2"),f.to(p,{fadeOverlay:1,duration:.5,ease:"power2.in"},"endHold"),f.call(()=>{u(!1)},[],"endHold+=0.55"),()=>{window.removeEventListener("resize",i),cancelAnimationFrame(l.current),clearTimeout(g),f.kill(),n.gsap.killTweensOf(p)}},[]),(0,t.jsxs)("div",{ref:s,style:{position:"fixed",inset:0,zIndex:9999,background:"#05081A",overflow:"hidden"},children:[(0,t.jsx)("canvas",{ref:r,style:{position:"absolute",inset:0,willChange:"transform"}}),(0,t.jsx)("button",{onClick:()=>{let e=d.current,t=r.current;e&&t&&(e.scene="entrance",e.entranceCartX=.34*t.width,e.dogeExpression="awe",e.fadeOverlay=0,e.coinVisible=!1,e.welcomeTextOpacity=0,e.welcomeSubOpacity=0),c.current?.seek("holdForCoin"),setTimeout(()=>u(!0),300)},"aria-label":"Skip intro",style:{position:"absolute",bottom:"32px",left:"50%",transform:"translateX(-50%)",background:"transparent",border:"1px solid var(--accent-cyan)",color:"var(--accent-cyan)",fontFamily:"var(--font-display)",fontSize:"11px",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",padding:"8px 18px",cursor:"pointer",borderRadius:"4px",opacity:+!!p,transition:"opacity 0.6s ease, background 0.2s ease",zIndex:1e4},onMouseEnter:e=>e.currentTarget.style.background="rgba(0,212,255,0.1)",onMouseLeave:e=>e.currentTarget.style.background="transparent",children:"SKIP INTRO ›"})]})}var r=e.i(57688),s=e.i(46932);function l({children:e,className:a="",style:n}){return(0,t.jsx)("div",{className:`rounded-2xl transition-all duration-300 hover:border-[rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] ${a}`,style:{background:"var(--bg-secondary)",border:"1px solid var(--border-subtle)",boxShadow:"0 0 24px rgba(0, 212, 255, 0.06)",...n},children:e})}var c=e.i(71829);let d="dhd_about_seen",p=[{icon:"💎",title:"Diamond Hands. Real Rewards.",body:"DHD rewards those who hold through the volatility. The longer you hold, the more you earn. True diamond hands never fold."},{icon:"🐕",title:"Built by the Pack.",body:"Community-driven from day one. Every burn, every milestone, every exchange listing is shared with holders. You're not just buying a coin — you're joining a movement."},{icon:"🚀",title:"More Than a Meme.",body:"DHD has ambitions beyond the meme. A DHD banking system, gaming currency, and investment platform are all on the horizon — built for the community, by the community."}],h=[{icon:"◎",label:"Built on Solana"},{icon:"💎",label:"Long-Term Holder Rewards"},{icon:"🔥",label:"Verified Burns at Every Milestone"},{icon:"🔒",label:"~1 Billion Supply — Locked"},{icon:"🚀",label:"Community Goal: Elon Notices DHD"}],x=`${c.CONTRACT_ADDRESS.slice(0,6)}...${c.CONTRACT_ADDRESS.slice(-4)}`;function u(){let[e,n]=(0,a.useState)(!1),o=async()=>{try{await navigator.clipboard.writeText(c.CONTRACT_ADDRESS)}catch{let e=document.createElement("textarea");e.value=c.CONTRACT_ADDRESS,e.style.cssText="position:fixed;opacity:0",document.body.appendChild(e),e.focus(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}n(!0),setTimeout(()=>n(!1),2e3)};return(0,t.jsxs)("button",{onClick:o,"aria-label":"Copy contract address",className:"contract-bar",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"5px 12px",background:e?"rgba(0,212,255,0.08)":"rgba(255,184,0,0.07)",border:`1px solid ${e?"var(--border-active)":"rgba(255,184,0,0.25)"}`,borderRadius:"8px",cursor:"pointer",transition:"background 0.2s, border-color 0.2s"},children:[(0,t.jsx)("span",{className:"contract-addr-full",style:{fontFamily:"monospace",fontSize:"11px",color:e?"var(--accent-cyan)":"var(--accent-gold)",letterSpacing:"0.04em",whiteSpace:"nowrap",transition:"color 0.2s"},children:c.CONTRACT_ADDRESS}),(0,t.jsx)("span",{className:"contract-addr-short",style:{display:"none",fontFamily:"monospace",fontSize:"11px",color:e?"var(--accent-cyan)":"var(--accent-gold)",letterSpacing:"0.04em",whiteSpace:"nowrap",transition:"color 0.2s"},children:x}),(0,t.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"3px",fontFamily:"var(--font-display)",fontSize:"9px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:e?"var(--accent-cyan)":"var(--text-secondary)",flexShrink:0,transition:"color 0.2s"},children:e?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",children:(0,t.jsx)("polyline",{points:"20 6 9 17 4 12"})}),"Copied!"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,t.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),(0,t.jsx)("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),"Copy"]})})]})}function m({onEnterCave:e}){let[n,o]=(0,a.useState)(!0),[i,c]=(0,a.useState)(!0),x=(0,a.useRef)(null);(0,a.useEffect)(()=>{sessionStorage.getItem(d)||(o(!1),sessionStorage.setItem(d,"1"))},[]),(0,a.useEffect)(()=>{let e=()=>{if(!x.current)return void c(!0);let e=x.current.getBoundingClientRect();c(!(e.top<window.innerHeight&&e.bottom>0))};return e(),window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]);let g=(e=0)=>({initial:n?{opacity:1,y:0}:{opacity:0,y:40},whileInView:{opacity:1,y:0},transition:{duration:.6,ease:"easeOut",delay:n?0:e},viewport:{once:!0}});return(0,t.jsxs)("section",{id:"about",className:"about-section",style:{position:"relative",minHeight:"100vh",background:"var(--bg-primary)",display:"flex",flexDirection:"column",alignItems:"center",overflow:"hidden"},children:[(0,t.jsx)("div",{className:"about-content-wrapper",style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",padding:"80px 48px 96px",gap:"48px"},children:(0,t.jsxs)("div",{className:"about-columns",style:{display:"flex",flexDirection:"row",alignItems:"center",gap:"56px",width:"100%",maxWidth:"1200px"},children:[(0,t.jsx)(s.motion.div,{...g(0),className:"about-image-col",style:{flex:"0 0 40%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:(0,t.jsx)(r.default,{src:"/images/doge-hero.png",width:500,height:750,alt:"Diamond Hand Doge",style:{width:"100%",maxWidth:"500px",height:"auto",display:"block",filter:"drop-shadow(0 0 20px rgba(0,212,255,0.4))",animation:"dogeFloat 4s ease-in-out infinite"}})}),(0,t.jsxs)("div",{className:"about-content-col",style:{flex:"0 0 60%",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"24px",textAlign:"left"},children:[(0,t.jsxs)(s.motion.div,{...g(0),style:{display:"flex",flexDirection:"column",gap:"24px",width:"100%"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"12px"},children:[(0,t.jsx)("span",{style:{fontFamily:"var(--font-display)",fontSize:"11px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--accent-cyan)",whiteSpace:"nowrap"},children:"💎 ON SOLANA"}),(0,t.jsx)(u,{})]}),(0,t.jsx)("h1",{style:{margin:0,fontFamily:"var(--font-display)",fontWeight:900,fontSize:"clamp(28px, 4vw, 52px)",color:"var(--text-primary)",textShadow:"0 0 30px rgba(0,212,255,0.4)",lineHeight:1.15},children:"What is Diamond Hand Doge?"}),(0,t.jsx)("p",{style:{margin:0,fontFamily:"var(--font-body)",fontSize:"18px",lineHeight:1.7,color:"var(--text-secondary)",maxWidth:"560px"},children:"Diamond Hand Doge (DHD) is the ultimate meme coin for holders with true diamond hands. Backed by a strong community and big dreams, DHD is all about holding tight and aiming for the moon. Easy to use, fun to own, and built for long-term growth — this isn't just a coin, it's a movement."}),(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:h.map(e=>(0,t.jsxs)("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 14px",background:"var(--bg-secondary)",border:"1px solid var(--border-subtle)",borderRadius:"8px",fontFamily:"var(--font-display)",fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-secondary)",whiteSpace:"nowrap"},children:[e.icon," ",e.label]},e.label))})]}),(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"16px",width:"100%"},children:p.map((e,a)=>(0,t.jsx)(s.motion.div,{...g(.15*a),style:{flex:"1 1 220px"},children:(0,t.jsxs)(l,{style:{height:"100%",padding:"24px 20px",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"12px",textAlign:"left"},children:[(0,t.jsx)("span",{style:{fontSize:"30px",lineHeight:1},children:e.icon}),(0,t.jsx)("h3",{style:{margin:0,fontFamily:"var(--font-display)",fontSize:"12px",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-primary)"},children:e.title}),(0,t.jsx)("p",{style:{margin:0,fontFamily:"var(--font-body)",fontSize:"13px",lineHeight:1.7,color:"var(--text-secondary)"},children:e.body})]})},e.title))}),(0,t.jsxs)(s.motion.div,{...g(.45),className:"about-cta",style:{marginTop:"8px"},children:[(0,t.jsxs)("button",{ref:x,onClick:e,className:"cave-cta-btn",children:[(0,t.jsx)("span",{className:"cave-cta-shimmer"}),(0,t.jsxs)("span",{className:"cave-cta-content",children:[(0,t.jsx)("span",{className:"cave-cta-icon",children:"🔦"}),(0,t.jsx)("span",{className:"cave-cta-text",children:"Explore the Cave"}),(0,t.jsx)("span",{className:"cave-cta-arrow",children:"→"})]})]}),(0,t.jsx)("p",{style:{marginTop:"10px",fontFamily:"var(--font-body)",fontSize:"12px",color:"var(--text-secondary)",letterSpacing:"0.04em"},children:"Enter the DHD cave world"})]})]})]})}),(0,t.jsx)("div",{style:{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"600px",height:"100px",background:"radial-gradient(ellipse, rgba(0,170,255,0.08), transparent)",pointerEvents:"none"}}),(0,t.jsx)("div",{className:`floating-cave-cta ${i?"floating-cave-cta--visible":""}`,children:(0,t.jsxs)("button",{onClick:e,className:"cave-cta-btn floating-cave-cta__btn",children:[(0,t.jsx)("span",{className:"cave-cta-shimmer"}),(0,t.jsxs)("span",{className:"cave-cta-content",children:[(0,t.jsx)("span",{className:"cave-cta-icon",children:"🔦"}),(0,t.jsx)("span",{className:"cave-cta-text",children:"Explore the Cave"}),(0,t.jsx)("span",{className:"cave-cta-arrow",children:"→"})]})]})}),(0,t.jsx)("style",{children:`
        @keyframes dogeFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        @keyframes cavePulse {
          0%, 100% { box-shadow: 0 0 24px rgba(255,184,0,0.5), 0 0 48px rgba(255,184,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15); }
          50%       { box-shadow: 0 0 40px rgba(255,184,0,0.85), 0 0 80px rgba(255,184,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15); }
        }

        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(5px); }
        }

        .cave-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          overflow: hidden;
          background: linear-gradient(135deg, #FFB800 0%, #FF8C00 50%, #FFB800 100%);
          background-size: 200% 200%;
          animation: cavePulse 2.4s ease-in-out infinite;
          transition: transform 0.18s ease, filter 0.18s ease;
          font-family: var(--font-display);
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .cave-cta-btn:hover {
          transform: translateY(-3px) scale(1.03);
          filter: brightness(1.12);
          animation-play-state: paused;
          box-shadow: 0 0 56px rgba(255,184,0,0.9), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .cave-cta-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .cave-cta-shimmer {
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          animation: shimmerSweep 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        .cave-cta-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          color: #1A0A00;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-shadow: 0 1px 0 rgba(255,255,255,0.25);
          white-space: nowrap;
        }

        .cave-cta-icon {
          font-size: 20px;
          line-height: 1;
          filter: drop-shadow(0 0 4px rgba(0,0,0,0.4));
        }

        .cave-cta-arrow {
          font-size: 18px;
          animation: arrowBounce 1.4s ease-in-out infinite;
          display: inline-block;
        }

        /* Floating sticky CTA */
        .floating-cave-cta {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          z-index: 50;
          opacity: 0;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
        }
        .floating-cave-cta--visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .floating-cave-cta__btn {
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(255,184,0,0.5) !important;
        }
        .floating-cave-cta .cave-cta-content {
          padding: 14px 28px !important;
          font-size: 13px !important;
        }

        @media (max-width: 767px) {
          .about-content-wrapper {
            padding: 40px 20px 80px !important;
            gap: 32px !important;
          }
          .about-columns {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .about-image-col {
            flex: none !important;
            width: 100% !important;
          }
          .about-image-col img {
            max-width: 220px !important;
            margin: 0 auto !important;
          }
          .about-content-col {
            flex: none !important;
            width: 100% !important;
            align-items: center !important;
            text-align: center !important;
          }
          .about-cta {
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .cave-cta-btn {
            width: 100% !important;
          }
          .cave-cta-content {
            padding: 16px 24px !important;
            font-size: 13px !important;
            justify-content: center !important;
          }
          /* Mobile: show short address, hide full */
          .contract-addr-full { display: none !important; }
          .contract-addr-short { display: inline !important; }
        }
      `})]})}var g=e.i(74080);function f(){return(0,a.useEffect)(()=>{window.scrollTo({top:0,behavior:"instant"});let e=setTimeout(()=>{window.location.href="/cave"},900);return()=>clearTimeout(e)},[]),(0,t.jsxs)("div",{style:{position:"fixed",inset:0,zIndex:9999,pointerEvents:"none"},children:[(0,t.jsx)("div",{className:"ct-overlay"}),(0,t.jsx)("div",{className:"ct-jags",children:(0,t.jsxs)("svg",{viewBox:"0 0 1440 64",preserveAspectRatio:"none",style:{width:"100%",height:"100%",display:"block"},children:[(0,t.jsx)("path",{d:"M0,64 L0,42 L80,16 L160,40 L240,10 L320,34 L400,6 L480,30 L560,14 L640,36 L720,2 L800,32 L880,12 L960,40 L1040,8 L1120,30 L1200,20 L1280,44 L1360,14 L1440,36 L1440,64 Z",fill:"#05081A"}),(0,t.jsx)("path",{d:"M0,42 L80,16 L160,40 L240,10 L320,34 L400,6 L480,30 L560,14 L640,36 L720,2 L800,32 L880,12 L960,40 L1040,8 L1120,30 L1200,20 L1280,44 L1360,14 L1440,36",fill:"none",stroke:"rgba(0,255,136,0.7)",strokeWidth:"2.5",filter:"url(#ctGlow)"}),(0,t.jsx)("defs",{children:(0,t.jsxs)("filter",{id:"ctGlow",x:"-10%",y:"-100%",width:"120%",height:"400%",children:[(0,t.jsx)("feGaussianBlur",{stdDeviation:"3",result:"b"}),(0,t.jsxs)("feMerge",{children:[(0,t.jsx)("feMergeNode",{in:"b"}),(0,t.jsx)("feMergeNode",{in:"SourceGraphic"})]})]})})]})}),[8,21,34,47,60,73,86].map((e,a)=>(0,t.jsx)("div",{className:"ct-sparkle",style:{left:`${e}%`,animationDelay:`${.28+.05*a}s`}},a)),(0,t.jsx)("style",{children:`
        @keyframes ct-rise {
          from { transform: translateY(100%); }
          to   { transform: translateY(0%); }
        }

        @keyframes ct-sparkle {
          0%   { opacity: 0; transform: translateY(0)   scale(0); }
          40%  { opacity: 1; transform: translateY(-80px) scale(1.3); }
          100% { opacity: 0; transform: translateY(-130px) scale(0); }
        }

        .ct-overlay {
          position: absolute;
          inset: 0;
          background: #05081A;
          animation: ct-rise 0.75s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        .ct-jags {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 100%;   /* sits just above the overlay */
          height: 64px;
          animation: ct-rise 0.75s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        .ct-sparkle {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00FF88;
          box-shadow: 0 0 10px #00FF88, 0 0 22px rgba(0,255,136,0.5);
          animation: ct-sparkle 0.55s ease-out forwards;
          opacity: 0;
        }
      `})]})}function y(){let[e,n]=(0,a.useState)(!1);return((0,a.useEffect)(()=>{n(!0)},[]),e)?(0,g.createPortal)((0,t.jsx)(f,{}),document.body):null}let b="dhd_intro_seen";e.s(["default",0,function(){let[e,n]=(0,a.useState)(!0),[o,r]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{sessionStorage.getItem(b)||n(!1)},[]),(0,t.jsxs)(t.Fragment,{children:[!e&&(0,t.jsx)(i,{onComplete:()=>{sessionStorage.setItem(b,"1"),n(!0)}}),e&&(0,t.jsx)(m,{onEnterCave:()=>r(!0)}),o&&(0,t.jsx)(y,{})]})}],31713)}]);