import { renderElements } from '../utils/webComponent.js'

export default class Character {
  constructor(name, stats) {
    this._effects = [];
    this._elements = {}; 
    this.renderElements = renderElements.bind(this)
    
    this._name = name;
    this._baseStats = Object.create(stats);
    this._stats = new Proxy(stats, {
      set: (target, prop, val) => {
        this.renderElements(prop, val)
        return Reflect.set(target, prop, val)  
      }
    });
  }

  get effects() {
    return this._effects;
  }

  damage(pts) {
    if (pts > 0) {
      this._stats.hp -= pts;
      if (this._stats.hp <= 0) {
        this._stats.hp = 0;
        console.log(`${this._name} has perished.`);
        this.fsm?.die()
        return;
      }
      console.log(
        `${this._name} takes ${pts} damage and has ${this._stats.hp} health left.`
      );
      console.log("");
    } else {
      console.log(`${this._name} takes no damage.`);
      console.log("");
    }  
  }

  heal(pts) {
    this._stats.hp += pts;
    console.log(
      `${this._name} heals ${pts} hp and has ${this._stats.hp} health left.`
    );
  }

  attack(char) {
    
    console.log(
      `${this._name} attacks ${char._name}.`
    );
    char.damage(this._stats.atk - (char.def || 0));
    console.log(`${char._name}'s hp: ${char._stats.hp} ///// ${this._name}'s hp: ${this._stats.hp}`);
    console.log("")
    if (char._stats.hp <= 0)
      this.stopAttackTimer(); //when one entity dies, the attacker stops
  }

  destroy() {
    for (let ef of this._effects) {
      ef.destroy();
    }
  }
}
