class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.player = new Player(this);
        this.background = new Background(this);
        this.obstacles = [];
        this.numberOfObstacles = 10;
        this.gravity;
        this.speed; //speed of side scrolling
        this.score; this.gameOver; this.timer;
        this.resize(window.innerWidth, window.innerHeight);
        this.msg1; this.msg2;

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });

        //Mouse Controls
        this.canvas.addEventListener('mousedown', e => {
            this.player.flap();

        })
        //Keyboard Controls
        window.addEventListener('keydown', e => {
            if(e.key == ' ' || e.key == 'Enter' || e.key == 'ArrowUp')
                this.player.flap();
            })

        //Touch Controls
        this.canvas.addEventListener('touchstart', e => {
            this.player.flap();
        })
    }

    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'green';
        this.ctx.font = '20px Share Tech Mono';
        this.ctx.textAlign = 'right';
        this.ctx.strokeStyle = 'yellow'; //This will make the collision circle red
        this.ctx.lineWidth = 2 * this.ratio; //This will make the collision circle thicker
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;
        this.background.resize();
        this.gravity = 0.15 * this.ratio;
        this.player.resize();
        this.speed = 1 * this.ratio; 
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });
        this.score = this.timer = 0; 
        //This will reset the score and timer when the game is restarted
        this.gameOver = false;
    }
    render(deltaTime){
        // console.log(deltaTime);
        if(!this.gameOver)this.timer += deltaTime; 
        //This will increase the timer every frame
        this.background.update();
        this.background.draw();
        this.drawStatusText();
        this.player.update();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            // obstacle.resize();
            obstacle.update();
            obstacle.draw();
        });
    }
    createObstacles(){
        this.obstacles = [];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600 * this.ratio;
        for(let i = 0; i < this.numberOfObstacles; i++){
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
        }
    }

    checkCollision(a, b){
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx,dy) //This will calculate the distance between the two objects
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return distance <= sumOfRadii; //This will return true if the distance is less than the sum of the radii (collision is true)
    }

    formatTimer(time){
        return (this.timer*0.001).toFixed(2); 
        //This will convert the timer from milliseconds to seconds
    }
  
    drawStatusText(){
        this.ctx.save();
        this.ctx.fillText('Score: ' + this.score, this.width-10, 30); 
        //This will display the score on the canvas
        this.ctx.textAlign = 'left'; 
        this.ctx.fillText('Timer: ' + this.formatTimer(), 10, 30);
        //This will display the timer on the canvas
        this.ctx.restore();
        if(this.gameOver){
            if(this.player.collided){ //Player Loses
                this.msg1 = 'Skill Issues lol';
                this.msg2 = 'Collision time = ' + this.formatTimer() + 's.';
            } else if(this.obstacles.length <= 0){ //Player Wins
                this.msg1 = 'Nice Skills!';
                this.msg2 = 'Now try doing it faster than ' + this.formatTimer() + 's?';
            }
            this.ctx.textAlign = 'center';
            this.ctx.font = '30px Share Tech Mono';
            this.ctx.fillText(this.msg1, this.width * 0.5, this.height * 0.5 - 50);
            this.ctx.fillText(this.msg2, this.width * 0.5, this.height * 0.5 -15);
            this.ctx.font = '20px Share Tech Mono';
            this.ctx.fillText('Press Enter to Restart', this.width * 0.5, this.height * 0.5 + 15); 
        }
    }
}

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);

    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime; //This will calculate the time between each frame
        lastTime = timeStamp; //This will update the lastTime variable
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});