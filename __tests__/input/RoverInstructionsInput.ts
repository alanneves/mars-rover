import { RoverInstructionsInput } from '../../src/input';
import * as utils from '../../src/utils/prompt';

describe('RoverInstructionsInput Validation', () => {
  const consoleLog = jest.spyOn(console, 'log');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate valid rover instructions input', async () => {
    // Arrange
    const mockPrompt = jest
      .spyOn(utils, 'prompt')
      .mockResolvedValueOnce('LMLMLMLMM');

    // Act
    const result = await RoverInstructionsInput.getInput();

    // Assert
    expect(result).toEqual(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
    expect(mockPrompt).toHaveBeenCalledWith(
      '3. Enter the instructions for the rover (eg: LMLMLMLMM):',
    );
  });

  it('should reask for rover instructions input if invalid', async () => {
    // Arrange
    jest
      .spyOn(utils, 'prompt')
      .mockResolvedValueOnce('LMLM5LMLMM')
      .mockResolvedValueOnce('LMLMLMLMM');

    // Act
    const result = await RoverInstructionsInput.getInput();

    // Assert
    expect(result).toEqual(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
    expect(consoleLog).toHaveBeenCalledWith(
      'Invalid rover instructions. Please try again.',
    );
  });
});
