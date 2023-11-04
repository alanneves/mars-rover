import { PlateauInput } from '../../src/input';
import * as utils from '../../src/utils/prompt'; // import the utils module

describe('Plateau Input Validation', () => {
  const consoleLog = jest.spyOn(console, 'log');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate valid plateau size input', async () => {
    // Arrange
    const mockPrompt = jest.spyOn(utils, 'prompt').mockResolvedValueOnce('5 5');

    // Act
    const result = await PlateauInput.getInput();

    // Assert
    expect(result).toEqual([5, 5]);
    expect(mockPrompt).toHaveBeenCalledWith(
      '1. Enter the plateau size (width height, e.g. 5 5):',
    );
  });

  it('should reask for plateau size input if invalid', async () => {
    // Arrange
    jest
      .spyOn(utils, 'prompt')
      .mockResolvedValueOnce('5 A')
      .mockResolvedValueOnce('5 5');

    // Act
    await PlateauInput.getInput();

    // Assert
    expect(consoleLog).toHaveBeenCalledWith(
      'Invalid plateau size. Please try again.',
    );
  });
});
