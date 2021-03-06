/*
-Player should have a name.
-Player needs a block function.
-Player needs a punch method (round house kick and special move will be bonus
moves for later if I have time)
-Player needs a health meter (an actual bar will a bonus later)
-Player needs a render function
-I'll need to know the player's position when a punch is thrown and then render
the animation
then I will need to have them move back into position once the punch is thrown.
-The ability to choose between ConAir Nicolas Cage and The Wicker Man Nicolas Cage
-Set hit points(health) and random damage points for punches
Bonuses:
-A moving animation
-A kick and special move animation/methods
-A health bar and a special move bar
*/
const ringSide = document.querySelector('.arena');

class Fighter {
  constructor(name, opponent, team, side) {
    this.name = name;
    this.opponent = opponent;
    this.team = team;
    this.hitpoints = 1000;
    this.fistOffset = 10;
    this.fighter = null;
    this.side = side;
    // sets the punch for both fighter and opponent
    this.punch = this.punch.bind(this);
  }
  setOpponent(opponent) {
    this.opponent = opponent;
  }
// sets the damage to a random amount
  takeDamage(amount) {
    this.hitpoints -= amount;
    //add code to make opponent's blood appear
    this.fighter.setAttribute('style', 'background: linear-gradient(rgba(200, 20, 20, .6), rgba(220, 20, 20 , .5)) url("http://i.imgur.com/4d4OBEe.jpg")');
    //add code to make opponent's blood disappear
    this.render();
    if (this.hitpoints <= 0) {
      alert(`You lose, ${this.team} Cage!`);
      this.totalClear();
    }
  }
// completely clears the ring and renders the fighters
  totalClear() {
    this.render();
    this.hitpoints = 1000;
    this.opponent.hitpoints = 1000;
    this.opponent.render();
  }

  punch() {
    // very useful trick. sets this to scope to both start and offset position
    const me = this;
    // sends the fist forward
    me.fistOffset -= 140;
    me.opponent.takeDamage(Math.floor(Math.random() * 300));
    me.render();

    setTimeout(
      function bringBack() {
        // brings the fist back to start
        me.fistOffset += 140;
        //add code to make opponent's blood disappear
        me.render()
      },
      300
    );
  }
// clears the fighters from the board
  clear() {
    if (this.fighter) {
      ringSide.removeChild(this.fighter);
      this.fighter = null;
    }
  }

  // renders the fists, fighters and health
  render() {
    this.clear();
    this.fighter = document.createElement('div');
    this.fighter.setAttribute('class', this.team);
    ringSide.appendChild(this.fighter);
    let hitpointsDisplay = document.createElement('h3');
    hitpointsDisplay.setAttribute('class', this.hitpoints);
    hitpointsDisplay.setAttribute('style', 'color: cyan');
    hitpointsDisplay.innerHTML = `Health ${this.hitpoints}`;
    this.fighter.appendChild(hitpointsDisplay);
    let fist = document.createElement('div');
    fist.setAttribute('class', 'fist');
    this.fighter.appendChild(fist);
    fist.setAttribute('style', `${this.side}: ${this.fistOffset}px`);
    let punch = this.punch;
    fist.addEventListener('click', punch);
  }
}
let j = new Fighter('john', null, 'red', 'left');
let r = new Fighter('raz', j, 'blue', 'right');
j.setOpponent(r);
j.render();
r.render();
