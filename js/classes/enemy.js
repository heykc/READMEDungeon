import Character from "./character.js";
import { enemies } from "../data/enemies.js";
import statDelegator from "../utils/statDelegator.js";
import Rand from "../utils/rng.js";
import buildElement from "../utils/buildElement.js";

class Enemy extends Character {
  // TODO: discuss differences enemy class has from generic character class -kc 8/6/2020
  constructor(name, stats) {
    super(name, stats);
    this.attackTimer = null;

    this._icon = 'skull';

    this._isLocked = stats.isLocked;

    //buildIcon()
    this._elements['createIcon'] = buildElement('touch-icon', {class: 'icon'}, this.getInfo);
  }

  startAttackTimer(p) {
    let self = this;
    this._attackTimer = setInterval(function () {
      self.attack(p);
    }, 5000 - this._stats.spd * 500);
  }

  stopAttackTimer() {
    clearInterval(this._attackTimer);
  }

  destroy() {
    this.stopAttackTimer();
    super.destroy();
  }

  get getInfo() {
    return {
      name: this._name,
      hp: this._stats.hp,
      atk: this._stats.atk,
      spd: this._stats.spd,
      icon: this._icon,
      isLocked: this._isLocked
    };
  }


}

export default function generateEnemy () {
  let enemy = enemies[Rand.random(enemies.length - 1)]
  let stats = statDelegator({atk: 0, hp: 0, spd: 0}, enemy.pts)

  return new Enemy(enemy.name, stats);
}


