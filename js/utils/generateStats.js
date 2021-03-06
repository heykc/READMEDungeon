import Rand from "./rng.js";

/*
 * takes an object of stats and a number of points to randomly delegate points to stats. any stat left at 0 gets +1.
 * @param stat {Object} - the object of stats to delegate points to
 * @param pts {number} - the amount of points to delegate
 * return {Object} - new stats with points
 */

export default function generateStats(stats) {
  let s = Object.create(stats)
  for(let key in s) {
    let min = s[key] - 3;
    let max = s[key] + 3;
    min = min <= 0 ? 1 : min;
    max = max >= 100 ? 100 : max;
    s[key] = Rand.random(max, min)
  }
  return s;
}
