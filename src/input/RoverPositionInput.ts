import { Direction } from "../enums";
import { prompt } from "../utils";

class RoverPositionInput {
  static async getInput(): Promise<
  [number, number, Direction]
> {
    const value = await prompt('2. Enter the initial position of the rover (x y direction, eg: 1 2 N):');
    if (!this.isValidRoverPosition(value)) {
      console.log('Invalid rover position. Please try again.');
      return this.getInput();
    }
    const [x, y, direction] = value.split(' ');
    return [Number(x), Number(y), direction as Direction];
  }

  private static isValidRoverPosition(value): boolean {
    const regex = /^[0-9]\d* [0-9]\d* [NSEW]$/;
    return regex.test(value);
  }
}

export { RoverPositionInput };
