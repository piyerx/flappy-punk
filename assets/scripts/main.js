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
        this.ctx.fillStyle = 'red';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;
        this.background.resize();
        this.gravity = 0.15 * this.ratio;
        this.player.resize();
        this.speed = 1.5 * this.ratio;
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });
    }
    render(){
        this.background.update();
        this.background.draw();
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
}

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});