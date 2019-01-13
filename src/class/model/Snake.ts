import { Point2D } from '../types';
import { GameMapLength } from '../constants';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  map,
  filter,
  scan,
  startWith,
  distinctUntilChanged,
  share,
  withLatestFrom,
} from 'rxjs/operators';

const Direction: { [key: number]: Point2D; } = {
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

const initLength = 5;
const initDirection = { x: 1, y: 0 };

export class Snake {

  // input
  keydown$ = new Subject<KeyboardEvent>();
  ticks$ = new Subject<number>();

  stretch$ = new BehaviorSubject<number>(initLength);

  // output
  direction$: Observable<Point2D>;
  length$: Observable<number>;
  body$: Observable<Array<Point2D>>;

  constructor() {

    this.direction$ = this.keydown$.pipe(
      map((event: KeyboardEvent) => Direction[event.keyCode]),
      filter(direction => !!direction),
      startWith(initDirection),
      scan(this.nextDirection),
      distinctUntilChanged(),
      share()
    );

    this.length$ = this.stretch$.pipe(
      scan((acc, value) => value + acc),
      share()
    );

    this.body$ = this.ticks$.pipe(
      withLatestFrom(this.direction$, this.length$, (_, direction, snakeLength) => [direction, snakeLength]),
      scan(this.moveSnake, this.initSnake()),
      // tap(val => console.log(val)),
      share()
    );
  }

  // ============================================================
  initSnake(): Array<Point2D> {
    let snake: Array<Point2D> = [{ x: 0, y: 0 }];

    for (let i = 0; i < initLength; i++) {
      this.moveSnake(snake, [initDirection, initLength]);
    }

    return snake;
  }

  moveSnake(snake, [direction, snakeLength]) {

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

  nextDirection(previous, next) {
    let isOpposite = (previous: Point2D, next: Point2D) => {
      return next.x === previous.x * -1 || next.y === previous.y * -1;
    };

    if (isOpposite(previous, next)) {
      return previous;
    }

    return next;
  }
}