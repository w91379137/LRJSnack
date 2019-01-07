

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { interval } from 'rxjs/observable/interval';
import { combineLatest } from 'rxjs/observable/combineLatest';

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
import { Point2D, Scene } from './class/types';
import { initSnake, moveSnake } from './class/model/Snake';

window.addEventListener("load", () => {

    let render = new view.Render();

    let ticks$ = interval(700);

    let direction$ = new BehaviorSubject<Point2D>({ x: 1, y: 0 });

    let length$ = new BehaviorSubject<number>(SnackLength);

    let snakeLength$ = length$.pipe(
        scan((step, snakeLength) => snakeLength + step),
        share()
    );

    let snake$: Observable<Array<Point2D>> = ticks$.pipe(
        withLatestFrom(direction$, snakeLength$, (_, direction, snakeLength) => [direction, snakeLength]),
        scan(moveSnake, initSnake()),
        share()
    );

    let scene$: Observable<Scene> = combineLatest(snake$, snake => ({ snake }));

    scene$.subscribe(data => {

        render.renderSnack(data.snake);
        
    });
});