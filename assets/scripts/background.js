class Background {
    constructor(game){
        this.game = game;
        //The exact size of the background image goes here.
        this.width = 2400;
        this.height = this.game.baseHeight;
        this.x = 0;
        // this.y = 0; no need as it'll take the entire height of the canvas.
        this.image = document.getElementById('background');
        this.scaledHeight;
        this.scaledWidth;
        
    }
    update(){
        this.x -= this.game.speed;    
        if(this.x <= -this.scaledWidth){
                this.x = 0;
        }
    }
    draw(){
        this.game.ctx.drawImage(this.image, this.x, 0, this.scaledWidth, this.scaledHeight);
        this.game.ctx.drawImage(this.image, this.x + this.scaledWidth, 0, this.scaledWidth, this.scaledHeight);

    }
    resize(){
       this.scaledHeight = this.game.height * this.game.ratio;
       this.scaledWidth = this.width * this.game.ratio;
       this.x=0; 
    }
}