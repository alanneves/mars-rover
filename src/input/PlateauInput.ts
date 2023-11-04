import { prompt } from '../utils';

export class PlateauInput {
  static async getInput(): Promise<Array<number>> {
    const size = await prompt(
      '1. Enter the plateau size (width height, e.g. 5 5):',
    );

    if (!this.isValidPlateauSize(size)) {
      console.log('Invalid plateau size. Please try again.');
      return this.getInput();
    }
    return size.split(' ').map(Number);
  }

  private static isValidPlateauSize(plateauSize): boolean {
    const regex = /^[1-9]\d* [1-9]\d*$/;
    return regex.test(plateauSize);
  }
}
