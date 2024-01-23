// Autor: Jhonathan Pimenta
// Cada bloquinho de tela possui 25px, então o left e top tem que ser multiplos de 25px.
// Quanto menor snake.speed mais rápido a serpente se move.
function Game() {
  this.speed = 65;
  this.direction = 'up';
  const div = document.querySelector('.divin');
  const startDisplay = document.querySelector('#start-display');
  const endDisplay = document.querySelector('#ending-display');

  this.snake = {
    snakePositions: [],
    makeOneMoreSnakeBit() {
      if (this.snakePositions != 0) {
        const newSnake = document.createElement('div');
        newSnake.classList.add('snake');
        div.appendChild(newSnake);
        this.snakePositions.push({ left: game.fruit.left, top: game.fruit.top, el: newSnake })
        newSnake.style.left = game.fruit.left * 25 + 'px'
        newSnake.style.top = game.fruit.top * 25 + 'px'

        return;
      }
      const newSnake = document.createElement('div');
      newSnake.classList.add('snake');
      div.appendChild(newSnake);
      newSnake.style.top = 9 * 25 + 'px'
      newSnake.style.left = 9 * 25 + 'px'
      this.snakePositions.push({ left: 9, top: 9, el: newSnake });
    }
  };

  this.fruit = {
    left: 0,
    top: 0,
    getNewFruit() {
      this.newFruit = document.createElement('div');
      this.newFruit.id = 'fruit';
      div.appendChild(this.newFruit);
    },
    getAleatoryPosition() {
      if (!this.newFruit) this.getNewFruit()
      this.left = Math.floor(Math.random() * 20);
      this.top = Math.floor(Math.random() * 20);
      this.newFruit.style.left = (this.left * 25) + 'px';
      this.newFruit.style.top = (this.top * 25) + 'px';
    },
  }

  this.start = () => {
    this.snake.makeOneMoreSnakeBit();
    this.fruit.getAleatoryPosition();
    window.addEventListener('keydown', e => this.updateKey(e));
    this.interval = setInterval(this.move, this.speed);
    startDisplay.style.display = 'none';
  }

  this.updateKey = (e) => {
    const key = e.key;
    if (((key === 'w') || (key === 'ArrowUp')) && (this.direction !== 'down')) this.direction = 'up';
    if (((key === 'a') || (key === 'ArrowLeft')) && (this.direction !== 'right')) this.direction = 'left';
    if (((key === 's') || (key === 'ArrowDown')) && (this.direction !== 'up')) this.direction = 'down';
    if (((key === 'd') || (key === 'ArrowRight')) && (this.direction !== 'left')) this.direction = 'right';
  };

  this.move = () => {
    for (let snakeIndex = this.snake.snakePositions.length - 1; snakeIndex > 0; snakeIndex--) {
      if (this.snake.snakePositions[0].left === this.snake.snakePositions[1].left && this.snake.snakePositions[0].top === this.snake.snakePositions[1].top) {
        break;
      }
      let { left, top } = this.snake.snakePositions[snakeIndex - 1];
      this.snake.snakePositions[snakeIndex].left = left;
      this.snake.snakePositions[snakeIndex].top = top;
      this.snake.snakePositions[snakeIndex].el.style.left = left * 25 + 'px';
      this.snake.snakePositions[snakeIndex].el.style.top = top * 25 + 'px';
    }

    switch (this.direction) {
      case 'up':
        if (this.snake.snakePositions[0].top === 0) {
          this.snake.snakePositions[0].top = 19
          this.snake.snakePositions[0].el.style.top = 19 * 25 + 'px'
          break;
        }
        this.snake.snakePositions[0].top = this.snake.snakePositions[0].top - 1
        this.snake.snakePositions[0].el.style.top = this.snake.snakePositions[0].top * 25 + 'px';
        break;
      case 'down':
        if (this.snake.snakePositions[0].top === 19) {
          this.snake.snakePositions[0].top = 0
          this.snake.snakePositions[0].el.style.top = 0 * 25 + 'px'
          break;
        }
        this.snake.snakePositions[0].top = this.snake.snakePositions[0].top + 1
        this.snake.snakePositions[0].el.style.top = this.snake.snakePositions[0].top * 25 + 'px';
        break;
      case 'left':
        if (this.snake.snakePositions[0].left === 0) {
          this.snake.snakePositions[0].left = 19
          this.snake.snakePositions[0].el.style.left = 19 * 25 + 'px'
          break;
        }
        this.snake.snakePositions[0].left = this.snake.snakePositions[0].left - 1
        this.snake.snakePositions[0].el.style.left = this.snake.snakePositions[0].left * 25 + 'px';
        break;
      case 'right':
        if (this.snake.snakePositions[0].left === 19) {
          this.snake.snakePositions[0].left = 0
          this.snake.snakePositions[0].el.style.left = 0 * 25 + 'px'
          break;
        }
        this.snake.snakePositions[0].left = this.snake.snakePositions[0].left + 1
        this.snake.snakePositions[0].el.style.left = this.snake.snakePositions[0].left * 25 + 'px';
        break;
    }

    for(let snakeIndex = 1; snakeIndex < this.snake.snakePositions.length; snakeIndex++) {
      if(this.snake.snakePositions.length > 1 && (this.snake.snakePositions[0].left === this.snake.snakePositions[snakeIndex].left && this.snake.snakePositions[0].top === this.snake.snakePositions[snakeIndex].top)) {
        this.gameOver();
        return;
      }
    }

    if ((this.snake.snakePositions[0].left === this.fruit.left) && (this.snake.snakePositions[0].top === this.fruit.top)) {
      this.snake.makeOneMoreSnakeBit();
      this.fruit.getAleatoryPosition();
    }
  }

  this.gameOver = () => {
    this.fruit.newFruit.remove();
    for(snakeBit of this.snake.snakePositions) {
      snakeBit.el.remove();
    }
    clearInterval(this.interval);
    endDisplay.style.display = 'flex';
  }
}
const game = new Game();

startButton =  document.querySelector('#startButton');
startButton.addEventListener('click', game.start);
