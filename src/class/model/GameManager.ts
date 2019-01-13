
import { Point2D } from '../types';
import { isEqualPoint, getRandomPosition } from './Function';
import { AppleCount } from '../constants';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
    scan,
    share,
    withLatestFrom,
} from 'rxjs/operators';

export class GameManager {

    // input
    snake$ = new Subject<Array<Point2D>>();
    apple$ = new BehaviorSubject<Array<Point2D>>([]);
    private scoreChange$ = new Subject<number>();

    // output
    snackStretch$ = new Subject<number>();
    appleChange$ = new Subject<{ isAdd: boolean, point: Point2D }>();
    score$ = new BehaviorSubject<number>(0);

    constructor() {

        this.scoreChange$.pipe(
            scan((acc, value) => value + acc, 0),
            share()
        ).subscribe(this.score$);

        this.snake$.pipe(withLatestFrom(this.apple$, (snake, apples) => {
            return { snake, apples };
        })).subscribe(data => {

            let snake = data.snake;
            let apples = data.apples;

            let head = snake[0];

            let isEat = false;
            for (let i = 0; i < apples.length; i++) {
                if (isEqualPoint(apples[i], head)) {
                    this.appleChange$.next({ isAdd: false, point: apples[i] });
                    isEat = true;
                    this.scoreChange$.next(100);
                    break;
                }
            }

            if (isEat) {
                this.snackStretch$.next(1);
            }
            else {
                if (apples.length < AppleCount) {
                    this.appleChange$.next({ isAdd: true, point: getRandomPosition(snake) });
                }
            }
        });
    }
}