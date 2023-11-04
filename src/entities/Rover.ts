import { Plateau } from './Plateau';
import { Direction, Instruction } from '../enums';
import { RotateDirection } from '../types';

export class Rover {
  private invalidMoves: number = 0;
  private directionMapping: Record<
    Direction,
    Record<Instruction.RotateLeft | Instruction.RotateRight, Direction>
  > = {
    [Direction.North]: {
      [Instruction.RotateLeft]: Direction.West,
      [Instruction.RotateRight]: Direction.East,
    },
    [Direction.South]: {
      [Instruction.RotateLeft]: Direction.East,
      [Instruction.RotateRight]: Direction.West,
    },
    [Direction.East]: {
      [Instruction.RotateLeft]: Direction.North,
      [Instruction.RotateRight]: Direction.South,
    },
    [Direction.West]: {
      [Instruction.RotateLeft]: Direction.South,
      [Instruction.RotateRight]: Direction.North,
    },
  };

  constructor(
    public x: number,
    public y: number,
    public direction: Direction,
    private plateau: Plateau,
  ) {
    this.plateau.addRover(this);
  }

  executeInstructions(instructions: Instruction[]): void {
    for (const instruction of instructions) {
      if (instruction === Instruction.Move) {
        this.move();
      } else {
        this.rotate(instruction);
      }
    }
  }

  rotate(rotation: RotateDirection): void {
    this.direction = this.directionMapping[this.direction][rotation];
  }

  move(): void {
    const [newX, newY] = this.calculateNewPosition();

    if (!this.isValidPosition(newX, newY)) {
      this.invalidMovement();
    } else {
      this.x = newX;
      this.y = newY;
    }
  }

  calculateNewPosition(): [number, number] {
    let newX = this.x;
    let newY = this.y;

    switch (this.direction) {
      case Direction.North:
        newY += 1;
        break;
      case Direction.South:
        newY -= 1;
        break;
      case Direction.East:
        newX += 1;
        break;
      case Direction.West:
        newX -= 1;
        break;
    }

    return [newX, newY];
  }

  isValidPosition(newX: number, newY: number): boolean {
    return (
      newX >= 0 &&
      newX <= this.plateau.x &&
      newY >= 0 &&
      newY <= this.plateau.y &&
      !this.plateau.hasCollision(newX, newY)
    );
  }

  invalidMovement(): void {
    this.invalidMoves++;
  }

  getFinalPosition(): string {
    return `Your final position is ${this.x} ${this.y} ${this.direction}\nYou have made ${this.invalidMoves} invalid moves\n`;
  }
}
