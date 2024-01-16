function Game() {
  this.snake = {
    element: document.querySelector('#snake'),
    left: 0,
    top: 0,
    setInitialPosition() {
      this.element.style.left = this.left + '%';
      this.element.style.top = this.top + '%';
    }
  };

  this.fruit = {
    element: document.querySelector('#fruit'),
    left: 10,
    top: 0,
    setInitialPosition() {
      this.element.style.left = this.left + '%';
      this.element.style.top = this.top + '%';
    }
  }
  this.snake.setInitialPosition()
  this.fruit.setInitialPosition()
  window.addEventListener('keydown', (e) => this.move(e))


  this.move = (event) => {
    const key = event.key;
    console.log(key)
      if((key === 'w') || (key == 'ArrowUp')) this.snake.element.style.top = `${this.snake.top -= 0.5}%`;
      if((key === 'a') || (key === 'ArrowLeft')) this.snake.element.style.left = `${this.snake.left -= 0.5}%`;
      if((key === 's') || (key === 'ArrowDown')) this.snake.element.style.top = `${this.snake.top += 0.5}%`;
      if((key === 'd') || (key === 'ArrowRight')) this.snake.element.style.left = `${this.snake.left += 0.5}%`;

      if((this.snake.left === this.fruit.left) && (this.snake.top === this.fruit.top)) this.aumenta
  }
}
const game = new Game();
