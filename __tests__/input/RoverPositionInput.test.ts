import { RoverPositionInput } from '../../src/input';
import * as utils from '../../src/utils/prompt';

describe('Rover Position Input Validation', () => {
  const consoleLog = jest.spyOn(console, 'log');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate valid rover position input', async () => {
    // Arrange
    const mockPrompt = jest.spyOn(utils, 'prompt').mockResolvedValueOnce('1 2 N');

    // Act
    const result = await RoverPositionInput.getInput();

    // Assert
    expect(result).toEqual([1, 2, 'N']);
    expect(mockPrompt).toHaveBeenCalledWith(
      '2. Enter the initial position of the rover (x y direction, eg: 1 2 N):',
    );
  });

  it('should reask for rover position input if invalid', async () => {
    // Arrange
    jest
      .spyOn(utils, 'prompt')
      .mockResolvedValueOnce('1 2')
      .mockResolvedValueOnce('1 2 N');

    // Act
    const result = await RoverPositionInput.getInput();

    // Assert
    expect(result).toEqual([1, 2, 'N']);
    expect(consoleLog).toHaveBeenCalledWith(
      'Invalid rover position. Please try again.',
    );
  });
});
