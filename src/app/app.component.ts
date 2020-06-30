import {Component} from '@angular/core';

import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

import {LogItem} from './models/log-item.interface';
import {ModalConfirmComponent} from './components/modal-confirm.component';
import {ModalEventItemComponent} from './components/modal-event-item.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    itemsRef: AngularFireList<LogItem>;
    items$: Observable<LogItem[]>;
    bsModalRef: BsModalRef;

    constructor(
        private db: AngularFireDatabase,
        private modalService: BsModalService
    ) {
        this.itemsRef = db.list<LogItem>('/events');
        this.items$ = this.itemsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        );
    }

    public updateItem(item: LogItem, event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }

        this.modalService.onHide
            .pipe(take(1))
            .subscribe((reason: string) => {
                if (reason === 'submit') {
                    console.log(this.bsModalRef.content.item);
                }
            });

        this.bsModalRef = this.modalService.show(ModalEventItemComponent, {
            animated: false,
            ignoreBackdropClick: true,
            initialState: {
                title: `Edit Item #${item.eventId}`,
                item: Object.assign({}, item)
            }
        } as ModalOptions);
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
        // this.itemsRef.push(item);

        this.modalService.onHide
            .pipe(take(1))
            .subscribe((reason: string) => {
                if (reason === 'submit') {
                    console.log(this.bsModalRef.content.item);
                }
            });

        this.bsModalRef = this.modalService.show(ModalEventItemComponent, {
            animated: false,
            ignoreBackdropClick: true,
            initialState: {
                title: 'Add Item'
            }
        } as ModalOptions);
    }

    public deleteItem(key: string, event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }

        this.modalService.onHide
            .pipe(take(1))
            .subscribe((reason: string) => {
                if (reason === 'yes') {
                    this.itemsRef.remove(key);
                }
            });

        this.bsModalRef = this.modalService.show(ModalConfirmComponent, {
            animated: false,
            ignoreBackdropClick: true,
            initialState: {
                textContent: 'Are you sure you want to delete this item?'
            }
        } as ModalOptions);
    }
}
