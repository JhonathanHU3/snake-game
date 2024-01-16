// Autor: Jhonathan Pimenta
// Cada bloquinho de tela possui 25px, então o left e top tem que ser multiplos de 25px.
// Quanto menor snake.speed mais rápido a serpente fia.
function Game() {
  this.snake = {
    element: document.querySelector('#snake'),
    speed: 350,
    left: 250,
    top: 250,
    setInitialPosition() {
      this.element.style.left = this.left + 'px';
      this.element.style.top = this.top + 'px';
    }
  };

  this.fruit = {
    element: document.querySelector('#fruit'),
    left: 25,
    top: 100,
    setInitialPosition() {
      this.element.style.left = this.left + 'px';
      this.element.style.top = this.top + 'px';
    }
  }
  this.snake.setInitialPosition()
  this.fruit.setInitialPosition()
  window.addEventListener('keydown', (e) => this.move(e))

  this.move = (event) => {
    if (event.key === this.lastKey) return;
    this.lastKey = event.key;
    clearInterval(this.interval);

    if ((this.lastKey === 'w') || (this.lastKey == 'ArrowUp')) {
      this.snake.element.style.top = `${this.snake.top -= 25}px`
      this.interval = setInterval(() => { this.snake.element.style.top = `${this.snake.top -= 25}px` }, this.snake.speed);
    }
    if ((this.lastKey === 'a') || (this.lastKey === 'ArrowLeft')) {
      this.snake.element.style.left = `${this.snake.left -= 25}px`
      this.interval = setInterval(() => { this.snake.element.style.left = `${this.snake.left -= 25}px` }, this.snake.speed);
    }
    if ((this.lastKey === 's') || (this.lastKey === 'ArrowDown')) {
      this.snake.element.style.top = `${this.snake.top += 25}px`
      this.interval = setInterval(() => { this.snake.element.style.top = `${this.snake.top += 25}px` }, this.snake.speed);
    }
    if ((this.lastKey === 'd') || (this.lastKey === 'ArrowRight')) {
      this.snake.element.style.left = `${this.snake.left += 25}px`
      this.interval = setInterval(() => { this.snake.element.style.left = `${this.snake.left += 25}px` }, this.snake.speed);
    }

  }


}
const game = new Game();
