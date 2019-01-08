import { Point2D } from '../types';
import { AppleCount, GameMapLength } from '../constants';
import { checkCollision, getRandomNumber } from './Function';

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