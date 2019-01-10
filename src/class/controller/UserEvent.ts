
import { fromEvent } from 'rxjs/observable/fromEvent';

export class UserEvent {
    keydown$ = fromEvent(document, 'keydown');
}