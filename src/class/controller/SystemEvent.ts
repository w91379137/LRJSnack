
import { interval } from 'rxjs/observable/interval';

export class SystemEvent {

    // output
    // fps$ = interval(1000 / 10);
    ticks$ = interval(200);
}