// ECMAScript 6

var map = document.getElementById("map");
var scoreSpan = document.getElementById("score-span");
var gameOverDiv = document.getElementById("game-over");

var cxt = map.getContext("2d");

var bg = "gray";
var snakeColor = "#304c9a";
var foodColor = "orange";
var killedColor = "red";

// pos: 0 - 399
function draw(pos, color) {
	cxt.fillStyle = color;
	
	// block size: 30 * 30
	// map size: 20 block * 20 block
	var x = pos % 20 * 25;
	var y = Math.floor(pos / 20) * 25;
	
	cxt.fillRect(x + 1, y + 1, 24, 24);
}

class Snake {
	constructor() {
		this.blocks = [];
		this.dir = 1;
		this.changeFinished = true;
		
	    for (let i = 0; i < arguments.length; i++) {
			draw(arguments[i], snakeColor);
			this.blocks.push(arguments[i]);
		}
	}
	
	length() {
		return this.blocks.length;
	}
	
	getHead() {
		return this.blocks[this.length() - 1];
	}
	
	// get or set direction
	direction(value) {
		if (value) {
			// solve if change too fast
			this.changeFinished = false;
			
			this.dir = value;
		}
		return this.dir;
	}
	
	// direction:
	// 1: right -1: left
	// 20: down -20: up
	move() {
		let lastHead = this.getHead();
		let head = lastHead + this.dir;
		
		// game over
		if (
			// out of bounds
			head % 20 == 0 && this.dir == 1 ||
			(head + 1) % 20 == 0 && this.dir == -1 ||
			head < 0 || head > 399 ||
			// knock on itself
			this.blocks.indexOf(head) != -1
		) {
			draw(lastHead, "red");
			
			this.kill();
			return;
		} else if (head == food.pos) {
			scoreSpan.innerHTML = `Score: ${++score}`;
			
			this.blocks.push(head);
			draw(head, snakeColor);
			
			food = new Food();
			
			this.changeFinished = true;
			return;
		}
		
		this.blocks.push(head);
		draw(head, snakeColor);
		
		// let end = this.blocks.shift();
		// draw(end, bg);
		draw(this.blocks.shift(), bg);
		
		this.changeFinished = true;
	}
	
	kill() {
		gameOver();
	}
}

class Food {
	constructor() {
		var pos;
		
		do {
			pos = Math.floor(Math.random() * 400);
		} while (snake.blocks.indexOf(pos) != -1);
		
	    draw(pos, foodColor);
		
		this.pos = pos;
	}
}

// initalize
var snake;
var food;
var time = 150; // the time each move takes
var interval;
var score = 0;

function fresh() {
	for (let i = 0; i < 400; i++) {
		draw(i, bg);
	}
}

fresh();

function start() {
	var startText = document.getElementById("start-text");
	
	// clear score
	gameOverDiv.style.display = "none";
	score = 0;
	scoreSpan.innerHTML = "Score: 0";
	
	fresh();
	
	// start
	snake = new Snake(42, 43, 44);
	food = new Food();
	
	interval = setInterval(() => {
		snake.move();
	}, time);
	
	startText.style.display = "none";
	window.onkeydown = keydown;
}

function keydownStart(e) {
	if (e.keyCode == 32) {
		start();
	}
}

function keydown(e) {
	var key = e.keyCode;
	var direction = snake.direction();
	
	if (snake.changeFinished) {
		
		if (direction == 1 || direction == -1) {
			
			if (key == 38) { // up
				snake.direction(-20);
			} else if (key == 40) { // down
				snake.direction(20);
			}
			
		} else if (direction == 20 || direction == -20) {
			
			if (key == 37) { // left
				snake.direction(-1);
			} else if (key == 39) { // right
				snake.direction(1);
			}
			
		} else {
			throw new SyntaxError(`Unexpected direction value ${direction}`);
		}
		
	}
}

function gameOver() {
	window.onkeydown = keydownStart;
	snake = null;
	clearInterval(interval);
	
	gameOverDiv.style.display = "block";
}

document.getElementById("instruction-ok").onclick = () => {
	document.getElementById("instructions").style.display = "none";
	
	document.getElementById("start").onclick = document.getElementById("restart").onclick = start;
	window.onkeydown = keydownStart;
};