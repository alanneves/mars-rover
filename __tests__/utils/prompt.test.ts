import * as inquirer from 'inquirer';
import { prompt } from '../../src/utils/prompt';

jest.mock('inquirer');

describe('prompt', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user input', async () => {
    // Arrange
    const message = 'Enter a value:';
    const userInput = 'test';
    (inquirer.prompt as jest.Mock).mockResolvedValueOnce({ value: userInput });

    // Act
    const result = await prompt(message);

    // Assert
    expect(result).toBe(userInput);
    expect(inquirer.prompt).toHaveBeenCalledWith([
      { type: 'input', name: 'value', message },
    ]);
  });

  it('should throw an error if user inputs "exit"', async () => {
    // Arrange
    const message = 'Enter a value:';
    (inquirer.prompt as jest.Mock).mockResolvedValueOnce({ value: 'exit' });

    // Act & Assert
    await expect(prompt(message)).rejects.toThrow('exit');
    expect(inquirer.prompt).toHaveBeenCalledWith([
      { type: 'input', name: 'value', message },
    ]);
  });
});
