import { DivSize, GameMapLength } from '../constants';
import { Point2D } from '../types';
import { Subject } from 'rxjs/Subject';

export class Render {

    snack$ = new Subject<Array<Point2D>>();
    apple$ = new Subject<Array<Point2D>>();
    score$ = new Subject<number>();

    constructor() {

        // 產生計分
        this.createScoreText();

        // 產生方格
        let x_array = Array(GameMapLength).fill(0).map((_, index) => index);
        let y_array = Array(GameMapLength).fill(0).map((_, index) => index);

        x_array.forEach(x => {
            y_array.forEach(y => {
                this.createDiv({ x, y });
            });
        });

        this.snack$.subscribe(snack => {
            this.renderSnack(snack);
        });
        this.apple$.subscribe(apple => {
            this.renderApples(apple);
        });

        this.score$.subscribe(score => {
            this.renderScore(score);
        });
    }

    scoreText: HTMLDivElement;
    createScoreText() {
        let div = document.createElement('div');

        div.style.position = 'absolute';
        div.style.left = '50%';
        div.style.top = '50%';

        div.style.zIndex = '-1';

        document.querySelector('body').appendChild(div);

        this.scoreText = div;
        this.scoreText.innerHTML = '0';
    }

    createDiv(p: Point2D) {
        let div = document.createElement('div');
        div.style.width = DivSize + 'px';
        div.style.height = DivSize + 'px';
        div.style.border = 'thin solid blue';

        div.style.position = 'absolute';
        div.style.left = '50%';
        div.style.top = '50%';

        div.style.marginLeft = (p.x - GameMapLength / 2) * (DivSize + 1) + 'px';
        div.style.marginTop = (p.y - GameMapLength / 2) * (DivSize + 1) + 'px';

        div.style.opacity = '0.5';

        div.id = this.divID(p);

        document.querySelector('body').appendChild(div);
    }

    divID(p: Point2D) {
        return 'D' + '_' + p.x + '_' + p.y;
    }

    snack_old_id = [];
    renderSnack(snack: Array<Point2D>) {

        let new_id = snack.map(p => '#' + this.divID(p));

        let remove = this.snack_old_id.filter(x => !new_id.includes(x));
        remove.forEach(id => {
            let div = document.querySelector(id) as HTMLDivElement;
            if (div) {
                div.style.backgroundColor = 'white';
            }
            else {
                console.log('id not find', id);
            }
        });

        let add = new_id.filter(x => !this.snack_old_id.includes(x));
        add.forEach(id => {
            let div = document.querySelector(id) as HTMLDivElement;
            if (div) {
                div.style.backgroundColor = 'gray';
            }
            else {
                console.log('id not find', id);
            }
        });

        this.snack_old_id = new_id;
    }

    apple_old_id = [];
    renderApples(apples: Array<Point2D>) {

        let new_id = apples.map(p => '#' + this.divID(p));

        let remove = this.apple_old_id.filter(x => !new_id.includes(x));
        remove.forEach(id => {
            let div = document.querySelector(id) as HTMLDivElement;
            if (div) {
                div.style.backgroundColor = 'white';
            }
            else {
                console.log('id not find', id);
            }
        });

        let add = new_id.filter(x => !this.apple_old_id.includes(x));
        add.forEach(id => {
            let div = document.querySelector(id) as HTMLDivElement;
            if (div) {
                div.style.backgroundColor = 'red';
            }
            else {
                console.log('id not find', id);
            }
        });

        this.apple_old_id = new_id;
    }

    renderScore(score: number) {
        this.scoreText.innerHTML = score.toString();
    }
}