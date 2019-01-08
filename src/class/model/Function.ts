

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function checkCollision(a, b) {
    return a.x === b.x && a.y === b.y;
}