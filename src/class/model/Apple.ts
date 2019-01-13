import { Point2D } from '../types';
import { isEqualPoint } from './Function';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
    scan,
} from 'rxjs/operators';

export class Apple {

    // input
    appleChange$ = new Subject<{ isAdd: boolean, point: Point2D }>();

    // output
    postions$ = new BehaviorSubject<Array<Point2D>>([]);

    constructor() {
        this.appleChange$.pipe(
            scan(this.changePostions, [])
        ).subscribe(this.postions$);
    }

    changePostions(postions, change: { isAdd: boolean, point: Point2D }) {

        let point_c = change.point;
        if (change.isAdd) {
            postions.push(point_c);
        }
        else {
            postions = postions.filter(point => !isEqualPoint(point, point_c));
        }

        return postions;
    }
}
