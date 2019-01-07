
export class Render {

    constructor() {

        let x_array = Array(20).fill(0).map((_, index) => index);
        let y_array = Array(20).fill(0).map((_, index) => index);

        x_array.forEach(x => {
            y_array.forEach(y => {
                this.createDiv(x, y);
            });
        });
    }

    createDiv(x, y) {
        let div = document.createElement('div');
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.border = 'thin solid blue';

        div.style.position = 'absolute';

        div.style.left = '50%';
        div.style.top = '50%';

        div.style.marginLeft = (x * 10) + 'px';
        div.style.marginTop = (y * 10) + 'px';

        document.querySelector('body').appendChild(div);
    }
}