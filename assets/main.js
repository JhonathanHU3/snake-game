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
        if (game.direction === 'up') {
          this.snakePositions.push({ left: this.snakePositions[this.snakePositions.length - 1].left, top: this.snakePositions[this.snakePositions.length - 1].top + 1, el: newSnake })
          console.log(this.snakePositions[this.snakePositions.length - 1].left, this.snakePositions[this.snakePositions.length - 1].top)
          newSnake.style.left = this.snakePositions[this.snakePositions.length - 1].left * 25 + 'px'
          newSnake.style.top = (this.snakePositions[this.snakePositions.length - 1].top) * 25 + 'px'
          console.log(this.snakePositions[1].left, this.snakePositions[1].top)
        }

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
    if (this.direction === 'up') {
      for (snakeObj of this.snake.snakePositions) {
        if (snakeObj.top === 0) {
          snakeObj.top = 19
          snakeObj.el.style.top = snakeObj.top * 25 + 'px'
          continue;
        }
        snakeObj.top--
        snakeObj.el.style.top = snakeObj.top * 25 + 'px'
      }
    }

    if (this.direction === 'down') {
      for (snakeObj of this.snake.snakePositions) {
        if (snakeObj.top === 19) {
          snakeObj.top = 0
          snakeObj.el.style.top = snakeObj.top * 25 + 'px'
          continue;
        }
        snakeObj.top++
        snakeObj.el.style.top = snakeObj.top * 25 + 'px'
      }
    }

    if (this.direction === 'left') {
      for (snakeObj of this.snake.snakePositions) {
        if (snakeObj.left === 0) {
          snakeObj.left = 19
          snakeObj.el.style.left = snakeObj.left * 25 + 'px'
          continue;
        }
        snakeObj.left--
        snakeObj.el.style.left = snakeObj.left * 25 + 'px'
      }
    }

    if (this.direction === 'right') {
      for (snakeObj of this.snake.snakePositions) {
        if (snakeObj.left === 19) {
          snakeObj.left = 0
          snakeObj.el.style.left = snakeObj.left * 25 + 'px'
          continue;
        }
        snakeObj.left++
        snakeObj.el.style.left = snakeObj.left * 25 + 'px'
      }
    }

    if ((this.snake.snakePositions[0].left === this.fruit.left) && (this.snake.snakePositions[0].top === this.fruit.top)) {
      this.fruit.getAleatoryPosition();
      this.snake.makeOneMoreSnakeBit();
    }
  }

  this.interval = setInterval(() => this.move(), 300);
}
const game = new Game();
