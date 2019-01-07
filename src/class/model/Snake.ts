import { Point2D } from '../types';
import { SnackLength } from '../constants';

export function initSnake(): Array<Point2D> {
  let snake: Array<Point2D> = [];

  for (let i = SnackLength - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  return snake;
}

export function moveSnake(snake, [direction, snakeLength]) {

  console.log(snake, direction, snakeLength);

  let nx = snake[0].x;
  let ny = snake[0].y;

  nx += 1 * direction.x;
  ny += 1 * direction.y;

  let tail;

  if (snakeLength > snake.length) {
    tail = { x: nx, y: ny };
  } else {
    tail = snake.pop();
    tail.x = nx;
    tail.y = ny;
  }

  snake.unshift(tail);

  return snake;
}