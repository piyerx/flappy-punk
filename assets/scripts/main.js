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
        this.numberOfObstacles = 1;
        this.gravity;
        this.speed; //speed of side scrolling
        this.score; this.gameOver; this.timer;
        this.resize(window.innerWidth, window.innerHeight);

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
    formatTimer(time){
        return (this.timer*0.001).toFixed(2); 
        //This will convert the timer from milliseconds to seconds
    }
    // checkCollisions(){
    //     this.obstacles.forEach(obstacle => {
    //         if(this.player.isTouching(obstacle)){
    //             this.gameOver = true;
    //         }
    //     });
    // }

    drawStatusText(){
        this.ctx.save();
        this.ctx.fillText('Score: ' + this.score, this.width-10, 30); 
        //This will display the score on the canvas
        this.ctx.textAlign = 'left'; 
        this.ctx.fillText('Timer: ' + this.formatTimer(), 10, 30);
        //This will display the timer on the canvas
        this.ctx.restore();
        if(this.gameOver){
            this.ctx.textAlign = 'center';
            this.ctx.font = '30px Share Tech Mono';
            this.ctx.fillText('Game Over!', this.width * 0.5, this.height * 0.5);
            this.ctx.font = '20px Share Tech Mono';
            this.ctx.fillText('Press Enter to Restart', this.width * 0.5, this.height * 0.5 + 30); 
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