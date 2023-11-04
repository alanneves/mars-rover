// import { Plateau } from '../src/entities/Plateau';
// import { Rover } from '../src/entities/Rover';
import { Direction } from '../src/enums';
import { Instruction } from '../src/enums/Instruction';
import { PlateauInput } from '../src/input/PlateauInput';
import { RoverInstructionsInput } from '../src/input/RoverInstructionsInput';
import { RoverPositionInput } from '../src/input/RoverPositionInput';
import { startMarsRover } from '../src/main';
import * as inquirer from 'inquirer';

jest.mock('inquirer');

describe('startMarsRover', () => {
  inquirer.prompt = jest.fn().mockResolvedValue({ value: 'exit' });
  const consoleLog = jest.spyOn(console, 'log');

  const mockGetInput = (
    plateauSize: Array<number>,
    roverInicialPosition: [number, number, Direction],
    instructions: Array<Instruction>,
  ): void => {
    jest.spyOn(PlateauInput, 'getInput').mockResolvedValueOnce(plateauSize);
    jest
      .spyOn(RoverPositionInput, 'getInput')
      .mockResolvedValueOnce(roverInicialPosition);
    jest
      .spyOn(RoverInstructionsInput, 'getInput')
      .mockResolvedValueOnce(instructions);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a plateau and a rover and execute instructions', async () => {
    // Arrange
    const instructionsInput = [
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.Move,
    ];
    mockGetInput([5, 5], [1, 2, Direction.North], instructionsInput);

    // spy class constructor

    // Act
    await startMarsRover();

    // Assert
    const expectedOutput =
      'Your final position is 1 3 N\nYou have made 0 invalid moves\n';
    expect(PlateauInput.getInput).toHaveBeenCalledTimes(1);
    expect(RoverPositionInput.getInput).toHaveBeenCalledTimes(2);
    expect(RoverInstructionsInput.getInput).toHaveBeenCalledTimes(1);
    expect(consoleLog).toHaveBeenCalledWith(expectedOutput);
  });

  it('should not create a rover if it has a collision with another rover', async () => {
    // Arrange
    const instructionsInput = [
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.RotateLeft,
      Instruction.Move,
      Instruction.Move,
    ];
    mockGetInput([5, 5], [1, 2, Direction.North], instructionsInput);
    mockGetInput([5, 5], [1, 3, Direction.East], instructionsInput);

    // Act
    await startMarsRover();

    // Assert
    const expectedOutput =
      'Rover cannot be placed at the same position as another rover.';
    expect(consoleLog).toHaveBeenCalledWith(expectedOutput);
  });
});
