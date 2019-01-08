import { Point2D } from './types';

export const DivSize = 10;
export const GameMapLength = 30;

export const SnackLength = 5;

export const DIRECTIONS: { [email: number]: Point2D; } = {
    37: { x: -1, y: 0 },
    39: { x: 1, y: 0 },
    38: { x: 0, y: -1 },
    40: { x: 0, y: 1 }
};

export enum Key {
    LEFT = 37,
    RIGHT = 39,
    UP = 38,
    DOWN = 40
}