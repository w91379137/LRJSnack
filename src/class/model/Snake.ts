import { Point2D } from '../types';
import { SnackLength, GameMapLength } from '../constants';
import { checkCollision } from './Function';
import { getRandomPosition } from './Apple';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  map,
  filter,
  scan,
  startWith,
  distinctUntilChanged,
  share,
  withLatestFrom,
  tap,
  skip
} from 'rxjs/operators';

const DIRECTIONS: { [key: number]: Point2D; } = {
  37: { x: -1, y: 0 },
  39: { x: 1, y: 0 },
  38: { x: 0, y: -1 },
  40: { x: 0, y: 1 }
};

enum Key {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40
}

export class Snake {

  // input
  keydown$ = new Subject<KeyboardEvent>();
  ticks$ = new Subject<number>();

  // output
  direction$: Observable<Point2D>;

  constructor() {

    this.direction$ = this.keydown$.pipe(
      map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]),
      filter(direction => !!direction),
      startWith(DIRECTIONS[Key.RIGHT]),
      scan(nextDirection),
      distinctUntilChanged()
    );

  }
}

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

export function eat(apples: Array<Point2D>, snake) {
  let head = snake[0];

  for (let i = 0; i < apples.length; i++) {
    if (checkCollision(apples[i], head)) {
      apples.splice(i, 1);
      return [...apples, getRandomPosition(snake)];
    }
  }

  return apples;
}