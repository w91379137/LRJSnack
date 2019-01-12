
import * as controller from './class/controller';
import * as model from './class/model';
import * as view from './class/view';

// 來源
// https://juejin.im/post/5acb32dd5188255c637b41fb

window.addEventListener('load', () => {

    // controller
    let systemEvent = new controller.SystemEvent();
    let userEvent = new controller.UserEvent();

    // model
    let gameManager = new model.GameManager();
    let snake = new model.Snake();
    let apple = new model.Apple();

    // view
    let render = new view.Render();

    // connect model
    apple.postions$.subscribe(gameManager.apple$);
    snake.body$.subscribe(gameManager.snake$);

    systemEvent.ticks$.subscribe(snake.ticks$);
    userEvent.keydown$.subscribe(snake.keydown$);
    gameManager.snackStretch$.subscribe(snake.stretch$);

    gameManager.appleChange$.subscribe(apple.appleChange$);

    // connect view
    apple.postions$.subscribe(render.apple$);
    snake.body$.subscribe(render.snack$);
});