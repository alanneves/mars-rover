import { Plateau } from '../../src/entities';
import { Rover } from '../../src/entities/Rover';
import { Direction, Instruction } from '../../src/enums';

describe('Rover', () => {
  let plateau: Plateau;
  let rover: Rover;

  beforeEach(() => {
    plateau = new Plateau(5, 5);
    rover = new Rover(1, 2, Direction.North, plateau);
  });

  describe('executeInstructions', () => {
    it('should move the rover to the correct position', () => {
      // Arrange
      const instructions = [
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

      // Act
      rover.executeInstructions(instructions);

      // Assert
      expect(rover.getFinalPosition()).toEqual(
        'Your final position is 1 3 N\nYou have made 0 invalid moves\n',
      );
    });
  });

  describe('rotate', () => {
    it('should rotate the rover to the correct direction', () => {
      // Arrange
      const initialDirection = rover.direction;

      // Act
      rover.rotate(Instruction.RotateLeft);

      // Assert
      expect(rover.direction).toEqual(
        initialDirection === Direction.North
          ? Direction.West
          : initialDirection === Direction.West
          ? Direction.South
          : initialDirection === Direction.South
          ? Direction.East
          : Direction.North,
      );
    });
  });

  describe('move', () => {
    it('should move the rover to the correct position', () => {
      // Arrange
      const initialX = rover.x;
      const initialY = rover.y;

      // Act
      rover.move();

      // Assert
      expect(rover.x).toEqual(initialX);
      expect(rover.y).toEqual(initialY + 1);
    });

    it('should increment invalidMoves for invalid movement', () => {
      // Arrange
      const invalidX = plateau.x + 1;
      const invalidY = plateau.y + 1;
      rover.x = invalidX;
      rover.y = invalidY;

      // Act
      rover.move();

      // Assert
      expect(rover.x).toEqual(invalidX);
      expect(rover.y).toEqual(invalidY);
      expect(rover.getFinalPosition()).toEqual(
        `Your final position is ${invalidX} ${invalidY} N\nYou have made 1 invalid moves\n`,
      );
    });
  });

  describe('calculateNewPosition', () => {
    it('should calculate the correct new position', () => {
      // Arrange
      const initialX = rover.x;
      const initialY = rover.y;

      // Act
      const [newX, newY] = rover.calculateNewPosition();

      // Assert
      expect(newX).toEqual(initialX);
      expect(newY).toEqual(initialY + 1);
    });
  });

  describe('isValidPosition', () => {
    it('should return true for a valid position', () => {
      // Arrange
      const validX = rover.x;
      const validY = rover.y + 1;

      // Act
      const isValid = rover.isValidPosition(validX, validY);

      // Assert
      expect(isValid).toEqual(true);
    });

    it('should return false for an invalid position', () => {
      // Arrange
      const invalidX = plateau.x + 1;
      const invalidY = plateau.y + 1;

      // Act
      const isValid = rover.isValidPosition(invalidX, invalidY);

      // Assert
      expect(isValid).toEqual(false);
    });
  });

  describe('invalidMovement', () => {
    it('should increment invalidMoves', () => {
      // Arrange
      const initialInvalidMoves = rover['invalidMoves'];

      // Act
      rover['invalidMovement']();

      // Assert
      expect(rover['invalidMoves']).toEqual(initialInvalidMoves + 1);
    });
  });

  describe('getFinalPosition', () => {
    it('should return the correct final position string', () => {
      // Arrange
      const invalidMoves = 2;
      rover['invalidMoves'] = invalidMoves;

      // Act
      const finalPosition = rover.getFinalPosition();

      // Assert
      expect(finalPosition).toEqual(
        `Your final position is ${rover.x} ${rover.y} ${rover.direction}\nYou have made ${invalidMoves} invalid moves\n`,
      );
    });
  });
});
