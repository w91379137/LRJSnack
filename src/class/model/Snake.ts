import { Point2D } from '../types';
import { SnackLength, GameMapLength } from '../constants';

export function initSnake(): Array<Point2D> {
  let snake: Array<Point2D> = [];

  for (let i = SnackLength - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  return snake;
}

export function moveSnake(snake, [direction, snakeLength]) {

  let nx = snake[0].x;
  let ny = snake[0].y;

  nx += 1 * direction.x;
  nx %= GameMapLength;
  ny += 1 * direction.y;
  ny %= GameMapLength;

  let add = { x: nx, y: ny };
  if (snakeLength <= snake.length) {
    snake.pop();
  }
  snake.unshift(add);

  return snake;
}