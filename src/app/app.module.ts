import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {ModalModule} from 'ngx-bootstrap/modal';

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
        ReactiveFormsModule,
        ModalModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    providers: [],
    entryComponents: [ModalConfirmComponent, ModalEventItemComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
