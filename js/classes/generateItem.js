import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";

export const itemTypes = {
  potion: 0,
  weapon: 1,
  armor: 2,
};

class Item {
  constructor(name, type, stats = {}, effects = []) {
    this._name = name;
    this._type = type;
    this._stats = stats;
    this._effects = effects;
    this._id = dec(Rand.random(), 8);
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get stats() {
    return this._stats;
  }

  get effects() {
    return this._effects;
  }

  get id() {
    return this._id;
  }
}

export function generateItem (type) {
  const item = Object.create(Rand.weightedRandom(type.items));
  const stats = Object.create(item.stats);
  const effects = Object.create(item.effects || null);
  return new Item(item.name, type.type, stats, effects)
}