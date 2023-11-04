import { Rover } from './Rover';

export class Plateau {
  private rovers: Rover[] = [];

  constructor(
    public x: number,
    public y: number,
  ) {
    this.x = x;
    this.y = y;
  }

  addRover(rover: Rover): void {
    this.rovers.push(rover);
  }

  hasCollision(x: number, y: number): boolean {
    return this.rovers.some((rover) => rover.x === x && rover.y === y);
  }
}
