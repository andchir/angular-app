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

        this.bsModalRef = this.modalService.show(ModalEventItemComponent, {
            class: 'modal-lg',
            animated: false,
            ignoreBackdropClick: true,
            initialState: {
                title: `Edit Item #${item.eventId}`,
                item: Object.assign({}, item),
                itemsRef: this.itemsRef
            }
        } as ModalOptions);
    }

    public addItem(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }

        this.modalService.onHide
            .pipe(take(1))
            .subscribe((reason: string) => {
                if (reason === 'submit') {
                    setTimeout(() => {
                        alert('New item added successfully.');
                    }, 0);
                }
            });

        this.bsModalRef = this.modalService.show(ModalEventItemComponent, {
            class: 'modal-lg',
            animated: false,
            ignoreBackdropClick: true,
            initialState: {
                title: 'Add Item',
                itemsRef: this.itemsRef
            }
        } as ModalOptions);
    }

    public deleteItem(item: LogItem, event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        if (!item.deletable) {
            setTimeout(() => {
                alert('This item is not deletable.');
            }, 0);
            return;
        }

        this.modalService.onHide
            .pipe(take(1))
            .subscribe((reason: string) => {
                if (reason === 'yes') {
                    this.itemsRef.remove(item.key)
                        .then((e) => {
                            alert('The item was successfully deleted.');
                        })
                        .catch((e) => {
                            alert('You dont have access!');
                        });
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
