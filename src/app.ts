

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { interval } from 'rxjs/observable/interval';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { fromEvent } from 'rxjs/observable/fromEvent';

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
import { SnackLength, DIRECTIONS, Key } from './class/constants';
import { Point2D, Scene } from './class/types';
import { initSnake, moveSnake, nextDirection, eat } from './class/model/Snake';
import { initApples } from './class/model/Apple';

window.addEventListener("load", () => {

    let render = new view.Render();

    let fps$ = interval(1000 / 10)
    let ticks$ = interval(200);
    let keydown$ = fromEvent(document, 'keydown');

    let direction$ = keydown$.pipe(
        map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]),
        filter(direction => !!direction),
        startWith(DIRECTIONS[Key.RIGHT]),
        scan(nextDirection),
        distinctUntilChanged()
      );

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

    let apples$ = snake$.pipe(
        scan(eat, initApples()),
        distinctUntilChanged(),
        share()
      );

    let scene$: Observable<Scene> = combineLatest(snake$, apples$, (snake, apples) => ({ snake, apples }));
    fps$.pipe(withLatestFrom(scene$, (_, scene) => scene)).subscribe(data => {

        render.renderSnackApples(data.apples);
        render.renderSnack(data.snake);
        
    });
});