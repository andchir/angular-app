import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AngularFireList} from '@angular/fire/database';

import {LogItem} from '../models/log-item.interface';

@Component({
    selector: 'app-modal-event-item-component',
    templateUrl: './templates/modal-event-item-component.html'
})
export class ModalEventItemComponent implements OnInit, OnDestroy {

    @ViewChild('formEl') formEl;
    itemsRef: AngularFireList<LogItem>;
    submitted = false;
    title: string;
    destroyed$ = new Subject<void>();
    item: LogItem = {} as LogItem;
    form: FormGroup;
    errorMessage = '';

    constructor(
        private bsModalRef: BsModalRef,
        private modalService: BsModalService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            type: [this.item.type || null, Validators.required],
            alertType: [this.item.alertType],
            ageInDays: [this.item.ageInDays || null, Validators.required],
            daysInLactation: [this.item.daysInLactation || null],
            deletable: [this.item.deletable || false],
            healthIndex: [this.item.healthIndex || null],
            heatIndexPeak: [this.item.heatIndexPeak || null],
            lactationNumber: [this.item.lactationNumber || null],
            oldLactationNumber: [this.item.oldLactationNumber || null],
            currentGroupName: [this.item.currentGroupName || null],
            newGroupName: [this.item.newGroupName || null],
            destinationGroupName: [this.item.destinationGroupName || null],
            daysInPregnancy: [this.item.daysInPregnancy || null],
            newborns: [this.item.newborns || null],
            calvingEase: [this.item.calvingEase || null],
            startDateTime: [
                typeof this.item.startDateTime !== 'undefined'
                    ? new Date(this.item.startDateTime * 1000)
                    : null,
                Validators.required
            ],
            endDateTime: [
                typeof this.item.endDateTime !== 'undefined'
                    ? new Date(this.item.endDateTime * 1000)
                    : null
            ],
            reportingDateTime: [
                typeof this.item.reportingDateTime !== 'undefined'
                    ? new Date(this.item.reportingDateTime * 1000)
                    : null,
                Validators.required
            ],
            minValueDateTime: [
                typeof this.item.minValueDateTime !== 'undefined'
                    ? new Date(this.item.minValueDateTime * 1000)
                    : null
            ]
        });
        this.form.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.onValueChanged());
    }

    onValueChanged(): void {
        if (!this.form) {
            return;
        }
        if (this.form.valid) {
            this.errorMessage = '';
        }
    }

    onSubmit(): void {
        this.formGroupMarkTouched(this.form);
        if (!this.form.valid) {
            this.showErrorMessage('Please correct the form filling errors.');
            this.focusFormError();
            return;
        }

        const data = this.form.value;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] instanceof Date) {
                    data[key] = (data[key] as Date).getTime() / 1000;
                }
            }
        }

        this.submitted = true;

        if (this.item.key) {
            // Update item
            this.itemsRef.update(this.item.key, data)
                .then(this.close.bind(this))
                .catch(() => {
                    this.errorMessage = 'You dont have access!';
                    this.submitted = false;
                });
        } else {
            // Create new item record
            this.itemsRef.push(data)
                .then(this.close.bind(this))
                .catch(() => {
                    this.errorMessage = 'You dont have access!';
                    this.submitted = false;
                });
        }
    }


    formGroupMarkTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            formGroup.controls[key].markAsTouched();
        });
    }

    showErrorMessage(message: string): void {
        this.errorMessage = message;
    }

    focusFormError(): void {
        setTimeout(() => {
            if (this.formEl.nativeElement.querySelector('.form-control.is-invalid')) {
                this.formEl.nativeElement.querySelector('.form-control.is-invalid').focus();
            }
        }, 0);
    }

    close(): void {
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
