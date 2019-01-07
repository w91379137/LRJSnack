
export class Render {

    constructor() {

        let div = document.createElement('div');
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.border = 'thin solid blue';
        document.querySelector('body').appendChild(div);

    }

}