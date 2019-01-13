import { Point2D } from '../types';
import { GameMapLength } from '../constants';

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isEqualPoint(a, b): boolean {
    return a.x === b.x && a.y === b.y;
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
    return !snake.some(segment => isEqualPoint(segment, position));
}