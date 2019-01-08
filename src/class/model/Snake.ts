import { Point2D } from '../types';
import { SnackLength, GameMapLength } from '../constants';

export function initSnake(): Array<Point2D> {
  let snake: Array<Point2D> = [];

  for (let i = 0; i < SnackLength; i++) {
    snake.unshift({ x: i, y: 0 });
  }

  return snake;
}

export function moveSnake(snake, [direction, snakeLength]) {

  let nx = snake[0].x;
  let ny = snake[0].y;

  nx += (GameMapLength + direction.x);
  nx %= GameMapLength;
  ny += (GameMapLength + direction.y);
  ny %= GameMapLength;

  let add = { x: nx, y: ny };
  if (snakeLength <= snake.length) {
    snake.pop();
  }
  snake.unshift(add);

  return snake;
}

export function nextDirection(previous, next) {
  let isOpposite = (previous: Point2D, next: Point2D) => {
    return next.x === previous.x * -1 || next.y === previous.y * -1;
  };

  if (isOpposite(previous, next)) {
    return previous;
  }

  return next;
}