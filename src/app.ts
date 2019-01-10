

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    skip
} from 'rxjs/operators';

import * as controller from './class/controller';
import * as view from './class/view';

import { SnackLength, DIRECTIONS, Key } from './class/constants';
import { Point2D, Scene } from './class/types';
import { initSnake, moveSnake, nextDirection, eat } from './class/model/Snake';
import { initApples } from './class/model/Apple';

// 來源
// https://juejin.im/post/5acb32dd5188255c637b41fb


window.addEventListener('load', () => {

    // controller
    let systemEvent = new controller.SystemEvent();
    let userEvent = new controller.UserEvent();

    // model

    // view
    let render = new view.Render();

    // connect
    let direction$ = userEvent.keydown$.pipe(
        map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]),
        filter(direction => !!direction),
        startWith(DIRECTIONS[Key.RIGHT]),
        scan(nextDirection),
        distinctUntilChanged()
    );

    let snackGrow$ = new BehaviorSubject<number>(SnackLength);

    let snakeLength$ = snackGrow$.pipe(
        scan((acc, value) => value + acc),
        share()
    );

    let snake$: Observable<Array<Point2D>> = systemEvent.ticks$.pipe(
        withLatestFrom(direction$, snakeLength$, (_, direction, snakeLength) => [direction, snakeLength]),
        scan(moveSnake, initSnake()),
        share()
    );

    let apples$ = snake$.pipe(
        scan(eat, initApples()),
        distinctUntilChanged(),
        share()
    );

    apples$.pipe(
        skip(1),
        tap(() => snackGrow$.next(1))
    ).subscribe();

    let score$ = snakeLength$.pipe(
        startWith(0),
        scan((score, _) => score + 100),
    );

    let scene$: Observable<Scene> = combineLatest(snake$, apples$, score$, (snake, apples, score) => ({ snake, apples, score }));
    systemEvent.fps$.pipe(withLatestFrom(scene$, (_, scene) => scene)).subscribe(scene => {

        render.renderApples(scene.apples);
        render.renderSnack(scene.snake);
        render.renderScore(scene.score);

    });
});