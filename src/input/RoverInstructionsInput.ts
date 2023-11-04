import { Instruction } from '../enums';
import { prompt } from '../utils';

class RoverInstructionsInput {
  static async getInput(): Promise<Array<Instruction>> {
    const value = await prompt(
      '3. Enter the instructions for the rover (eg: LMLMLMLMM):',
    );
    if (!RoverInstructionsInput.isValidRoverInstructions(value)) {
      console.log('Invalid rover instructions. Please try again.');
      return RoverInstructionsInput.getInput();
    }
    return value.split('') as Array<Instruction>;
  }

  private static isValidRoverInstructions(value: string): boolean {
    const regex = /^[LRM]+$/;
    return regex.test(value);
  }
}

export { RoverInstructionsInput };
