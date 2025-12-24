Games.snake={
  init(){this.s=[{x:10,y:10}];this.d={x:0,y:0};this.f={x:5,y:5};this.c=0;},
  update(){
    this.c++; if(this.c<6)return; this.c=0;
    if(keys.ArrowLeft)this.d={x:-1,y:0};
    if(keys.ArrowRight)this.d={x:1,y:0};
    if(keys.ArrowUp)this.d={x:0,y:-1};
    if(keys.ArrowDown)this.d={x:0,y:1};
    const h={x:this.s[0].x+this.d.x,y:this.s[0].y+this.d.y};
    this.s.unshift(h);
    if(h.x===this.f.x&&h.y===this.f.y){
      this.f={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};
    } else this.s.pop();
  },
  draw(){
    ctx.fillStyle="#00ff95";
    this.s.forEach(p=>ctx.fillRect(p.x*20,p.y*20,20,20));
    ctx.fillStyle="#ff0066";
    ctx.fillRect(this.f.x*20,this.f.y*20,20,20);
  }
};

