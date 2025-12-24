Games.platformer = {
  init(){
    this.T = 32;
    this.camX = 0;

    this.player = {
      x: 64, y: 64, w: 28, h: 28,
      vx: 0, vy: 0, onGround: false
    };

    this.gravity = 0.9;
    this.jump = -15;
    this.speed = 4;

    this.map = [
      "00000000000000000000000000000000",
      "00000000000000000000000000000000",
      "00000000000111100000000000000000",
      "00000000000000000000001111000000",
      "00000001111000000000000000000000",
      "00000000000000000001111000000000",
      "00011100000000000000000001111000",
      "00000000000011100000000000000000",
      "11111111111111111111111111111111"
    ];
  },

  update(){
    const p = this.player;

    // Horizontal
    if(keys.ArrowLeft) p.vx = -this.speed;
    else if(keys.ArrowRight) p.vx = this.speed;
    else p.vx = 0;

    // Jump
    if((keys.ArrowUp || keys.Space) && p.onGround){
      p.vy = this.jump;
      p.onGround = false;
    }

    p.vy += this.gravity;

    p.x += p.vx;
    this.collide("x");

    p.y += p.vy;
    this.collide("y");

    this.camX = Math.max(0, p.x - innerWidth / 2);
    if(p.y > innerHeight + 200) this.reset();
  },

  reset(){
    this.player.x = 64;
    this.player.y = 64;
    this.player.vx = this.player.vy = 0;
  },

  collide(axis){
    const p = this.player;
    const T = this.T;

    p.onGround = false;

    const left   = Math.floor(p.x / T);
    const right  = Math.floor((p.x + p.w) / T);
    const top    = Math.floor(p.y / T);
    const bottom = Math.floor((p.y + p.h) / T);

    for(let y = top; y <= bottom; y++){
      for(let x = left; x <= right; x++){
        if(this.map[y]?.[x] !== "1") continue;

        const tx = x * T;
        const ty = y * T;

        if(axis === "x"){
          if(p.vx > 0) p.x = tx - p.w;
          if(p.vx < 0) p.x = tx + T;
          p.vx = 0;
        }

        if(axis === "y"){
          if(p.vy > 0){
            p.y = ty - p.h;
            p.vy = 0;
            p.onGround = true;
          }
          if(p.vy < 0){
            p.y = ty + T;
            p.vy = 0;
          }
        }
      }
    }
  },

  draw(){
    ctx.fillStyle = "#050608";
    ctx.fillRect(0,0,innerWidth,innerHeight);

    // Tiles
    ctx.fillStyle = "#2a2a2a";
    for(let y=0;y<this.map.length;y++){
      for(let x=0;x<this.map[y].length;x++){
        if(this.map[y][x]==="1"){
          ctx.fillRect(
            x*this.T - this.camX,
            y*this.T,
            this.T,
            this.T
          );
        }
      }
    }

    // Player
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ff95";
    ctx.fillStyle = "#00ff95";
    ctx.fillRect(
      this.player.x - this.camX,
      this.player.y,
      this.player.w,
      this.player.h
    );
    ctx.restore();
  }
};

