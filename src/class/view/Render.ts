import { DivSize, GameMapLength } from '../constants';
import { Point2D } from '../types';

export class Render {

    constructor() {

        let x_array = Array(GameMapLength).fill(0).map((_, index) => index);
        let y_array = Array(GameMapLength).fill(0).map((_, index) => index);

        x_array.forEach(x => {
            y_array.forEach(y => {
                this.createDiv(x, y);
            });
        });
    }

    createDiv(x, y) {
        let div = document.createElement('div');
        div.style.width = DivSize + 'px';
        div.style.height = DivSize + 'px';
        div.style.border = 'thin solid blue';

        div.style.position = 'absolute';

        div.style.left = '50%';
        div.style.top = '50%';

        div.style.marginLeft = (x - GameMapLength / 2) * (DivSize + 1) + 'px';
        div.style.marginTop = (y - GameMapLength / 2) * (DivSize + 1) + 'px';

        div.id = 'D' + x + '_' + y;

        document.querySelector('body').appendChild(div);
    }

    renderSnack(snack: Array<Point2D>) {

        snack.forEach(point => {
            let id = '#D' + point.x + '_' + point.y;
            let div = document.querySelector(id) as HTMLDivElement;
            if (div) {
                div.style.backgroundColor = 'gray';
            }
            else {
                console.log('id not find', id);
            }
        });
    }
}