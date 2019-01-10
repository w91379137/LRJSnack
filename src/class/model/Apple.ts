import { Point2D } from '../types';
import { AppleCount, GameMapLength } from '../constants';
import { checkCollision, getRandomNumber } from './Function';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
    startWith,
    scan,
    filter,
    map
} from 'rxjs/operators';

export class Apple {

    // input
    appleChange$: Observable<{ isAdd: boolean, point: Point2D }>;

    // output
    postions$: Observable<Array<Point2D>>;

    constructor() {

        // this.postions$ = this.appleChange$.pipe(
        //     scan(this.changePostions, [])
        // );

        this.postions$ = new BehaviorSubject<Array<Point2D>>([]);
    }

    changePostions(change: { isAdd: boolean, point: Point2D }, postions) {

        let p_c = change.point;
        if (change.isAdd) {
            postions.push(p_c);
        }
        else {
            postions = postions.filter(p => (p.x !== p_c.x) || (p.y !== p_c.y) );
        }

        return postions;
    }

}


export function initApples(): Array<Point2D> {
    let apples = [];

    for (let i = 0; i < AppleCount; i++) {
        apples.push(getRandomPosition());
    }

    return apples;
}

export function getRandomPosition(snake: Array<Point2D> = []): Point2D {
    let position = {
        x: getRandomNumber(0, GameMapLength - 1),
        y: getRandomNumber(0, GameMapLength - 1)
    };

    if (isEmptyCell(position, snake)) {
        return position;
    }

    return getRandomPosition(snake);
}

function isEmptyCell(position: Point2D, snake: Array<Point2D>): boolean {
    return !snake.some(segment => checkCollision(segment, position));
}