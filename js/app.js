/*I got help from Ben Cunnnigham's video. https://www.youtube.com/watch?v=7PHhRrjgTDA */

// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

/*using math.random to randomize the speed of the enemies*/
  if (this.x > 510){
    this.x = -50;
    this.speed = 100 + Math.floor(Math.random()* 222 );
  }

  if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
      }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var player = function(x, y){
  this.x = x;
  this.y = y;
  this.player = 'images/char-princess-girl.png';
};

player.prototype.update = function (dt) {
}

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

player.prototype.handleInput = function (press) {
  if (press == 'left' && this.x > 0) {
    this.x -= 102;
  }
  if (press == 'right' && this.x < 405) {
    this.x += 102;
  }
  if (press == 'up' && this.y > 0){
    this.y -= 83;
  }
  if (press == 'down' && this.y < 405) {
    this.y += 83;
  }
  if (this.y < 0){
    setTimeout(function() {
      player.x = 202;
      player.y = 405;
    }, 750);
  }
}

let allEnemies = [];
let enemyLocation = [60, 130, 215];

enemyLocation.forEach(function (location) {
  enemy = new Enemy(0, location, 200);
  allEnemies.push(enemy);
});


var player = new player (202, 405);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }

    player.handleInput(allowedKeys[e.keyCode]);
});
