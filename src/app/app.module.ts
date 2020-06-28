import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {IsLoadingModule} from '@service-work/is-loading';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IsLoadingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
