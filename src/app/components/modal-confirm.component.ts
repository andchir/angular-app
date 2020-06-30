import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-modal-confirm-component',
    template: `
        <div class="modal-header"><h5 class="modal-title">Confirm</h5></div>
        <div class="modal-body text-center">
            <p [innerHTML]="textContent"></p>
            <button type="button" class="btn btn-primary px-5 mr-2" (click)="confirm($event)">Yes</button>
            <button type="button" class="btn btn-secondary px-5 mr-2" (click)="decline($event)">No</button>
        </div>
    `
})
export class ModalConfirmComponent implements OnInit {

    textContent: string;

    constructor(
        private bsModalRef: BsModalRef,
        private modalService: BsModalService
    ) {}

    ngOnInit() {

    }

    confirm(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        this.modalService.setDismissReason('yes');
        this.bsModalRef.hide();
    }

    decline(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        this.modalService.setDismissReason('no');
        this.bsModalRef.hide();
    }

    cancel(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        this.modalService.setDismissReason('cancel');
        this.bsModalRef.hide();
    }
}
