import { Plateau } from '../../src/entities/Plateau';
import { Rover } from '../../src/entities/Rover';
import { Direction } from '../../src/enums';

describe('Plateau', () => {
  let plateau: Plateau;

  beforeEach(() => {
    plateau = new Plateau(5, 5);
  });

  it('should create a plateau with the given dimensions', () => {
    expect(plateau.x).toBe(5);
    expect(plateau.y).toBe(5);
  });

  it('should add a rover to the plateau', () => {
    const rover = new Rover(1, 2, Direction.North, plateau);
    plateau.addRover(rover);

    expect(plateau.hasCollision(1, 2)).toBe(true);
  });

  it('should not have a collision if no rovers are present', () => {
    expect(plateau.hasCollision(1, 2)).toBe(false);
  });

  it('should have a collision if a rover is present at the given coordinates', () => {
    const rover = new Rover(1, 2, Direction.North, plateau);
    plateau.addRover(rover);

    expect(plateau.hasCollision(1, 2)).toBe(true);
  });

  it('should not have a collision if a rover is present at different coordinates', () => {
    const rover = new Rover(1, 2, Direction.North, plateau);
    plateau.addRover(rover);

    expect(plateau.hasCollision(3, 4)).toBe(false);
  });
});
