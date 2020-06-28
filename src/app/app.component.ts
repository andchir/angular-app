import {AfterViewInit, Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {IsLoadingService} from '@service-work/is-loading';

import {LogDataService} from './services/log-data.service';
import {DataList} from './models/data-list.interface';
import {LogItem} from './models/log-item.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    data$: Observable<DataList<LogItem>>;

    constructor(
        private loadingService: IsLoadingService,
        private dataService: LogDataService
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    getData(event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        this.loadingService.remove();
        this.data$ = this.loadingService.add(this.dataService.getItemsList());
    }
}
