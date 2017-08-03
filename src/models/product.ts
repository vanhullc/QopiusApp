import { Level } from './level';

export class Product {
  levels: Level[] = [];
  constructor(data) {
    let keys = Object.keys(data);
    for(let i = 0; i<keys.length; i++) {
      this.levels[i] = data[keys[i]];
    }
  }
}