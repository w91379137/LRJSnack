
import { fromEvent } from 'rxjs/observable/fromEvent';

export class UserEvent {

    // output
    keydown$ = fromEvent(document, 'keydown');
}