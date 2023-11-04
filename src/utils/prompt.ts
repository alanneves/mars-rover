import * as inquirer from 'inquirer';

const prompt = async (message: string): Promise<string> => {
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message,
    },
  ]);

  if (value === 'exit') {
    throw new Error('exit');
  }

  return value;
};

export { prompt };
