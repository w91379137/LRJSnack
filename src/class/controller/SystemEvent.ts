
import { interval } from 'rxjs/observable/interval';

export class SystemEvent {
    fps$ = interval(1000 / 10);
    ticks$ = interval(200);
}