// Autor: Jhonathan Pimenta
// Cada bloquinho de tela possui 25px, então o left e top tem que ser multiplos de 25px.
// Quanto menor snake.speed mais rápido a serpente fia.
function Game() {
  this.speed = 300;
  this.direction = 'up';
  const div = document.querySelector('.divin');
  this.snake = {
    snakePositions: [],
    makeOneMoreSnakeBit() {
      if (this.snakePositions != 0) {
        const newSnake = document.createElement('div');
        newSnake.classList.add('snake');
        div.appendChild(newSnake);
        this.snakePositions.unshift({ left: game.fruit.left, top: game.fruit.top, el: newSnake })
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

  this.snake.makeOneMoreSnakeBit();
  this.fruit.getAleatoryPosition();
  window.addEventListener('keydown', e => this.updateKey(e));

  this.updateKey = (e) => {
    const key = e.key;
    if (((key === 'w') || (key === 'ArrowUp')) && (this.direction !== 'down')) this.direction = 'up';
    if (((key === 'a') || (key === 'ArrowLeft')) && (this.direction !== 'right')) this.direction = 'left';
    if (((key === 's') || (key === 'ArrowDown')) && (this.direction !== 'up')) this.direction = 'down';
    if (((key === 'd') || (key === 'ArrowRight')) && (this.direction !== 'left')) this.direction = 'right';
  };

  this.move = () => {
    for(let snakeIndex = this.snake.snakePositions.length - 1; snakeIndex > 0; snakeIndex--) {
      let {left, top} = this.snake.snakePositions[snakeIndex - 1];
      this.snake.snakePositions[snakeIndex].left = left;
      this.snake.snakePositions[snakeIndex].top = top;
      this.snake.snakePositions[snakeIndex].el.style.left = left * 25 + 'px';
      this.snake.snakePositions[snakeIndex].el.style.top = top * 25 + 'px';
    }

    switch(this.direction) {
      case 'up':
        this.snake.snakePositions[0].top = this.snake.snakePositions[0].top - 1
        this.snake.snakePositions[0].el.style.top = this.snake.snakePositions[0].top * 25 + 'px';
        break;
      case 'down':
          this.snake.snakePositions[0].top = this.snake.snakePositions[0].top + 1
          this.snake.snakePositions[0].el.style.top = this.snake.snakePositions[0].top * 25 + 'px';
          break;
      case 'left':
            this.snake.snakePositions[0].left = this.snake.snakePositions[0].left - 1
            this.snake.snakePositions[0].el.style.left = this.snake.snakePositions[0].left * 25 + 'px';
            break;
      case 'right':
        this.snake.snakePositions[0].left = this.snake.snakePositions[0].left + 1
        this.snake.snakePositions[0].el.style.left = this.snake.snakePositions[0].left * 25 + 'px';
        break;
    }

    if ((this.snake.snakePositions[0].left === this.fruit.left) && (this.snake.snakePositions[0].top === this.fruit.top)) {
      this.snake.makeOneMoreSnakeBit();
      this.fruit.getAleatoryPosition();
    }
  }

  this.interval = setInterval(() => this.move(), 200);
}
const game = new Game();
