

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { interval } from 'rxjs/observable/interval';

import {
    map,
    filter,
    scan,
    startWith,
    distinctUntilChanged,
    share,
    withLatestFrom,
    tap,
    skip,
    switchMap,
    takeWhile,
    first
} from 'rxjs/operators';

import * as view from './class/view';
import { SnackLength } from './class/constants';
import { Point2D } from './class/types';
import { generateSnake } from './class/model/Snake';

window.addEventListener("load", () => {

    let render = new view.Render();

    let ticks$ = interval(5000);

    let length$ = new BehaviorSubject<number>(SnackLength);

    let snakeLength$ = length$.pipe(
        scan((step, snakeLength) => snakeLength + step),
        share()
    );

    let snake$: Observable<Array<Point2D>> = ticks$.pipe(
        withLatestFrom(snakeLength$, (_, direction, snakeLength) => [direction, snakeLength]),
        scan(snack => snack, generateSnake()),
        share()
    );

    snake$.subscribe(val => console.log(val));
});