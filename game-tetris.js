Games.tetris = {
  init(){
    this.cols = 10;
    this.rows = 20;
    this.size = 30;

    this.grid = Array.from({length:this.rows},
      ()=>Array(this.cols).fill(0)
    );

    this.shapes = [
      [[1,1,1,1]],
      [[1,1],[1,1]],
      [[0,1,0],[1,1,1]],
      [[1,1,0],[0,1,1]],
      [[0,1,1],[1,1,0]]
    ];

    this.colors = [
      "#00ff95",
      "#ffb000",
      "#ff0066",
      "#00bfff",
      "#ff00ff"
    ];

    this.spawn();
    this.tick = 0;
  },

  spawn(){
    const i = Math.floor(Math.random()*this.shapes.length);
    this.piece = {
      shape: this.shapes[i],
      x: 3,
      y: 0,
      c: this.colors[i]
    };
  },

  update(){
    this.tick++;
    if(this.tick < 15) return;
    this.tick = 0;

    this.piece.y++;

    if(this.hit()){
      this.piece.y--;
      this.merge();
      this.clear();
      this.spawn();
    }

    if(keys.ArrowLeft){
      this.piece.x--;
      if(this.hit()) this.piece.x++;
      keys.ArrowLeft=false;
    }

    if(keys.ArrowRight){
      this.piece.x++;
      if(this.hit()) this.piece.x--;
      keys.ArrowRight=false;
    }

    if(keys.ArrowDown){
      this.piece.y++;
      if(this.hit()) this.piece.y--;
      keys.ArrowDown=false;
    }
  },

  hit(){
    for(let y=0;y<this.piece.shape.length;y++){
      for(let x=0;x<this.piece.shape[y].length;x++){
        if(!this.piece.shape[y][x]) continue;
        const gx = this.piece.x + x;
        const gy = this.piece.y + y;
        if(
          gx < 0 ||
          gx >= this.cols ||
          gy >= this.rows ||
          this.grid[gy]?.[gx]
        ) return true;
      }
    }
    return false;
  },

  merge(){
    this.piece.shape.forEach((row,y)=>{
      row.forEach((v,x)=>{
        if(v) this.grid[this.piece.y+y][this.piece.x+x] = this.piece.c;
      });
    });
  },

  clear(){
    for(let y=this.rows-1;y>=0;y--){
      if(this.grid[y].every(c=>c)){
        this.grid.splice(y,1);
        this.grid.unshift(Array(this.cols).fill(0));
        y++;
      }
    }
  },

  draw(){
    ctx.fillStyle="#050608";
    ctx.fillRect(0,0,innerWidth,innerHeight);

    // Grid
    for(let y=0;y<this.rows;y++){
      for(let x=0;x<this.cols;x++){
        if(this.grid[y][x]){
          ctx.fillStyle=this.grid[y][x];
          ctx.fillRect(
            x*this.size,
            y*this.size,
            this.size,
            this.size
          );
        }
      }
    }

    // Active piece
    ctx.fillStyle=this.piece.c;
    this.piece.shape.forEach((row,y)=>{
      row.forEach((v,x)=>{
        if(v){
          ctx.fillRect(
            (this.piece.x+x)*this.size,
            (this.piece.y+y)*this.size,
            this.size,
            this.size
          );
        }
      });
    });
  }
};

