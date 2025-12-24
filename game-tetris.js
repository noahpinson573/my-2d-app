Games.tetris = {
  init(){
    this.w=10; this.h=20; this.s=30;
    this.grid=[...Array(this.h)].map(()=>Array(this.w).fill(0));
    this.shapes=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]]];
    this.colors=["#00ff95","#ffb000","#ff0066"];
    this.spawn(); this.t=0;
  },
  spawn(){
    const i=Math.floor(Math.random()*this.shapes.length);
    this.p={s:this.shapes[i],x:3,y:0,c:this.colors[i]};
  },
  update(){
    if(++this.t<15)return; this.t=0;
    this.p.y++;
    if(this.hit()){this.p.y--; this.merge(); this.spawn();}
    if(keys.ArrowLeft){this.p.x--; if(this.hit())this.p.x++; keys.ArrowLeft=false;}
    if(keys.ArrowRight){this.p.x++; if(this.hit())this.p.x--; keys.ArrowRight=false;}
  },
  hit(){
    return this.p.s.some((r,y)=>r.some((v,x)=>{
      if(!v)return false;
      const gx=this.p.x+x, gy=this.p.y+y;
      return gx<0||gx>=this.w||gy>=this.h||this.grid[gy][gx];
    }));
  },
  merge(){
    this.p.s.forEach((r,y)=>r.forEach((v,x)=>{
      if(v)this.grid[this.p.y+y][this.p.x+x]=this.p.c;
    }));
  },
  draw(){
    this.grid.forEach((r,y)=>r.forEach((c,x)=>{
      if(c){ctx.fillStyle=c;ctx.fillRect(x*this.s,y*this.s,this.s,this.s);}
    }));
    ctx.fillStyle=this.p.c;
    this.p.s.forEach((r,y)=>r.forEach((v,x)=>{
      if(v)ctx.fillRect((this.p.x+x)*this.s,(this.p.y+y)*this.s,this.s,this.s);
    }));
  }
};
