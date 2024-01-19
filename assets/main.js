// Autor: Jhonathan Pimenta
// Cada bloquinho de tela possui 25px, então o left e top tem que ser multiplos de 25px.
// Quanto menor snake.speed mais rápido a serpente fia.
function Game() {
  this.speed = 300;
  const interval = setInterval(this.move(), this.speed);
  this.direction = 'up';
  const div = document.querySelector('.divin');
  this.snake = {
    snakePositions: [],
    makeOneMoreSnakeBit() {
      if(this.snakePositions != 0) {
        this.snakePositions.push({});

        return;
      }
      this.snakePositions.push({left: 9, top: 9});
      const newSnake = document.createElement('div');
      newSnake.id = 'snake';
      div.appendChild(newSnake);
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
      if(!this.newFruit) this.getNewFruit()
      this.left = Math.floor(Math.random() * 20);
      this.top = Math.floor(Math.random() * (19 - (-1)) + (-1));
      this.newFruit.style.left = (this.left * 25) + 'px';
      this.newFruit.style.top = (this.top * 25) + 'px';
    },
  }

  this.snake.makeOneMoreSnakeBit();
  this.fruit.getAleatoryPosition();
  window.addEventListener('keydown', this.updateKey(e));

  this.updateKey = (e) {
    const key = e.key;
    if ((key === 'w') || (key == 'ArrowUp')) this.direction = 'up';
    if ((key === 'a') || (key === 'ArrowLeft')) this.direction = 'left';
    if ((key === 's') || (key === 'ArrowDown')) this.direction = 'down';
    if ((key === 'd') || (key === 'ArrowRight'))this.direction = 'right';
  }

  this.move = (event) => {
    if (event.key === this.lastKey) return;
    this.lastKey = event.key;



  }


}
const game = new Game();
