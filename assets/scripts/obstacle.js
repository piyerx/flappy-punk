class Obstacle {
    constructor(game,x){
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.x = x;
        this.y = this.game.height * 0.5 - this.scaledHeight;
        this.speedY = 2;
    }

    update(){
        this.x -= this.game.speed;
        this.y += this.speedY;
        //This will make the obstacle bounce off the top and bottom of the canvas
        //This is the same as the player bouncing off the top and bottom of the canvas
        if(this.y <=0 || this.y >= this.game.height - this.scaledHeight){
            this.speedY *= -1;
        }
    }

    draw(){
        this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
    }

    resize(){
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
    }

}