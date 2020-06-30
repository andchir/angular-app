import {Component, OnDestroy, OnInit} from '@angular/core';

import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

import {LogItem} from '../models/log-item.interface';

@Component({
    selector: 'app-modal-event-item-component',
    template: `
        <div class="modal-header"><h5 class="modal-title">{{ title }}</h5></div>
        <div class="modal-body">

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary px-5 mr-2" (click)="submit($event)">Save</button>
            <button type="button" class="btn btn-secondary mr-2" (click)="cancel($event)">Cancel</button>
        </div>
    `
})
export class ModalEventItemComponent implements OnInit, OnDestroy {

    title: string;
    destroyed$ = new Subject<void>();
    item: LogItem;

    constructor(
        private bsModalRef: BsModalRef,
        private modalService: BsModalService
    ) {}

    ngOnInit() {

    }

    submit(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        this.modalService.setDismissReason('submit');
        this.bsModalRef.hide();
    }

    cancel(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        this.modalService.setDismissReason('cancel');
        this.bsModalRef.hide();
    }

    unsubscribe(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}
