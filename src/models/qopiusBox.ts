import { Product } from './product';

export class Box {
  probability: number;
  // Coordinates of points
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  candidates: Product[] = [];
  selectedCandidate: number;
  active: boolean = false;
  constructor(result) {
    this.x1 = result.x1;
    this.y1 = result.y1;
    this.x2 = result.x2;
    this.y2 = result.y2;
    this.probability = result.probability;
    // Sometimes there is no candidates field
    if (result.candidates) {
      let keys = Object.keys(result.candidates);
      for(let i=0; i<keys.length; i++) {
        this.candidates[i] = new Product(result.candidates[keys[i]]);
      }
    }
    this.active = false;
  }
  getWidth(): number {
    return this.x2 - this.x1;
  }
  getHeight(): number {
    return this.y2 - this.y1;
  }
  getCenterX(): number {
    return (this.x1 + this.x2) / 2;
  }
  getCenterY(): number {
    return (this.y1 + this.y2) / 2;
  }
  toString() {
    return "x1: "+this.x1+" y1: "+this.y1+" x2: "+this.x2+" y2: "+this.y2;
  }
}