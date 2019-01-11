

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Point2D } from '../types';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { checkCollision } from './Function';
import { getRandomPosition } from './Apple';
import { AppleCount } from '../constants';
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

export class GameManager {

    // input
    snack$ = new Subject<Array<Point2D>>();
    apple$ = new BehaviorSubject<Array<Point2D>>([]);

    // output
    snackStretch$ = new Subject<number>();
    appleChange$ = new Subject<{ isAdd: boolean, point: Point2D }>();

    constructor() {

        let data$: Observable<any> = combineLatest(this.snack$, this.apple$, (snake, apples) => ({ snake, apples }));

        this.snack$.pipe(withLatestFrom(data$, (_, data) => data)).subscribe(data => {

            let snake = data.snake as Array<Point2D>;
            let apples = data.apples as Array<Point2D>;

            let head = snake[0];

            let isEat = false;
            for (let i = 0; i < apples.length; i++) {
                if (checkCollision(apples[i], head)) {
                    this.appleChange$.next({ isAdd: false, point: apples[i] });
                    isEat = true;
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