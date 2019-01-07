import { Point2D } from '../types';
import { SnackLength } from '../constants';

export function generateSnake(): Array<Point2D> {
  let snake: Array<Point2D> = [];

  for (let i = SnackLength - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  return snake;
}