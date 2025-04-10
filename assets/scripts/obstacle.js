class Obstacle {
    constructor(game,x){
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.x = x;
        this.y = Math.random() * (this.game.height - this.scaledHeight);
        this.speedY = Math.random() < 0.5? -1*this.game.ratio : 1*this.game.ratio; 
        // v This will randomly decide if the obstacle will go up or down
        this.game.ratio;
        this.markedForDeletion = false; 
        //This will be used to delete the obstacle when it goes off the screen
    }

    update(){
        this.x -= this.game.speed;
        this.y += this.speedY;
        //This will make the obstacle bounce off the top and bottom of the canvas
        //This is the same as the player bouncing off the top and bottom of the canvas
        if(this.y <=0 || this.y >= this.game.height - this.scaledHeight){
            this.speedY *= -1;
        }
        if(this.isOffScreen()){
            this.markedForDeletion = true;
            this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion);
            //This will delete the obstacle from the array of obstacles   
            this.game.score++;
            //This will increase the score when an obstacle is deleted
        }
        if(this.game.obstacles.length <= 0){
            this.game.gameOver = true;
            //This will end the game when there are no obstacles left on the canvas
        }
    }

    draw(){
        this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
    }

    resize(){
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
    }
    isOffScreen(){
        return this.x < -this.scaledWidth;
    }

}