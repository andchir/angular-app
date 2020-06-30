import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {AppComponent} from './app.component';
import {ModalConfirmComponent} from './components/modal-confirm.component';
import {ModalEventItemComponent} from './components/modal-event-item.component';

@NgModule({
    declarations: [
        AppComponent,
        ModalConfirmComponent,
        ModalEventItemComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    providers: [],
    entryComponents: [ModalConfirmComponent, ModalEventItemComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
