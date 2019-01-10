

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
import * as model from './class/model';
import * as view from './class/view';

import { SnackLength } from './class/constants';
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
    let snack = new model.Snake();

    // view
    let render = new view.Render();

    // connect
    userEvent.keydown$.subscribe( snack.keydown$ );

    let apples$ = snack.snake$.pipe(
        scan(eat, initApples()),
        distinctUntilChanged(),
        share()
    );

    apples$.pipe(
        skip(1),
        tap(() => snack.snackGrow$.next(1))
    ).subscribe();

    let score$ = snack.snakeLength$.pipe(
        startWith(0),
        scan((score, _) => score + 100),
    );

    let scene$: Observable<Scene> = combineLatest(snack.snake$, apples$, score$, (snake, apples, score) => ({ snake, apples, score }));
    systemEvent.fps$.pipe(withLatestFrom(scene$, (_, scene) => scene)).subscribe(scene => {

        render.renderApples(scene.apples);
        render.renderSnack(scene.snake);
        render.renderScore(scene.score);

    });
});