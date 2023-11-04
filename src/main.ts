import { Rover } from './entities';
import { Plateau } from './entities/Plateau';
import {
  PlateauInput,
  RoverInstructionsInput,
  RoverPositionInput,
} from './input';

async function startMarsRover(): Promise<void> {
  console.log('--------------- Mars Rover ---------------');
  console.log('Type "exit" to quit the program.');
  console.log('Follow the instructions below to begin:');

  try {
    const [plateauX, plateauY] = await PlateauInput.getInput();
    const plateau = new Plateau(plateauX, plateauY);
    const rovers: Rover[] = [];

    while (true) {
      const [roverX, roverY, direction] = await RoverPositionInput.getInput();
      if (plateau.hasCollision(roverX, roverY)) {
        console.log(
          'Rover cannot be placed at the same position as another rover.',
        );
        continue;
      }
      const rover = new Rover(roverX, roverY, direction, plateau);
      rovers.push(rover);

      const instructions = await RoverInstructionsInput.getInput();
      rover.executeInstructions(instructions);

      console.log(rover.getFinalPosition());
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'exit') {
      console.log('Goodbye :)');
    } else {
      console.log('An unexpected error occurred.');
    }
  }
}

startMarsRover();

export { startMarsRover };
