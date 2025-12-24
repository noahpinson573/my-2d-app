Games.platformer={
  init(){
    this.T=32;
    this.camX=0;
    this.p={x:64,y:64,w:28,h:28,vx:0,vy:0,onGround:false};
    this.g=0.9; this.j=-15; this.s=4;
    this.map=[
      "000000000000000000000000",
      "000000000000000000000000",
      "000000001111000000000000",
      "000000000000001111000000",
      "000000111100000000000000",
      "111111111111111111111111"
    ];
  },
  update(){
    const p=this.p;
    p.vx=keys.ArrowLeft?-this.s:keys.ArrowRight?this.s:0;
    if((keys.ArrowUp||keys.Space)&&p.onGround){p.vy=this.j;p.onGround=false;}
    p.vy+=this.g;
    p.x+=p.vx; this.collide("x");
    p.y+=p.vy; this.collide("y");
    this.camX=Math.max(0,p.x-innerWidth/2);
  },
  collide(axis){
    const p=this.p,T=this.T; p.onGround=false;
    const l=Math.floor(p.x/T),r=Math.floor((p.x+p.w)/T);
    const t=Math.floor(p.y/T),b=Math.floor((p.y+p.h)/T);
    for(let y=t;y<=b;y++)for(let x=l;x<=r;x++){
      if(this.map[y]?.[x]!=="1")continue;
      const tx=x*T,ty=y*T;
      if(axis==="x"){p.x=p.vx>0?tx-p.w:tx+T;p.vx=0;}
      if(axis==="y"){
        if(p.vy>0){p.y=ty-p.h;p.vy=0;p.onGround=true;}
        else{p.y=ty+T;p.vy=0;}
      }
    }
  },
  draw(){
    ctx.fillStyle="#2a2a2a";
    this.map.forEach((r,y)=>[...r].forEach((c,x)=>{
      if(c==="1")ctx.fillRect(x*this.T-this.camX,y*this.T,this.T,this.T);
    }));
    ctx.fillStyle="#00ff95";
    ctx.fillRect(this.p.x-this.camX,this.p.y,this.p.w,this.p.h);
  }
};
