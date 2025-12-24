Games.breakout={
  init(){this.p=innerWidth/2;this.b={x:this.p,y:innerHeight-60,vx:4,vy:-4};},
  update(){
    if(keys.ArrowLeft)this.p-=6;
    if(keys.ArrowRight)this.p+=6;
    this.b.x+=this.b.vx; this.b.y+=this.b.vy;
    if(this.b.x<0||this.b.x>innerWidth)this.b.vx*=-1;
    if(this.b.y<0)this.b.vy*=-1;
    if(this.b.y>innerHeight-30&&Math.abs(this.b.x-this.p)<60)this.b.vy*=-1;
  },
  draw(){
    ctx.fillStyle="#00ff95";
    ctx.fillRect(this.p-60,innerHeight-20,120,10);
    ctx.beginPath();
    ctx.arc(this.b.x,this.b.y,8,0,Math.PI*2);
    ctx.fill();
  }
};
