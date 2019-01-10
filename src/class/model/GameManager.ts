

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Point2D } from '../types';

export class GameManager {

    // input
    snack$ = new Subject<Array<Point2D>>();
    apple$ = new Subject<Array<Point2D>>();

    // output
    snackStretch$: Observable<number>;
    appleChange$: Observable<{ isAdd: boolean, point: Point2D }>;

    constructor() {

    }
}