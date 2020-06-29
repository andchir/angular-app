import {Component} from '@angular/core';

import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

import {LogItem} from './models/log-item.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    items$: Observable<LogItem[]>;

    constructor(
        private db: AngularFireDatabase
    ) {
        this.items$ = db.list<LogItem>('/events').valueChanges();
    }

    public addItem(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        // const item = {
        //     eventId: 11111,
        //     animalId: 1,
        //     cowId: 2
        // } as LogItem;
        // this.db.list<LogItem>('/events').push(item);
    }
}
