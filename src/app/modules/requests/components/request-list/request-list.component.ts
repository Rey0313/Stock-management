import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-request-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './request-list.component.html',
    styleUrl: './request-list.component.css'
})

export class RequestListComponent {
    requests: any[] = [];

    constructor(private requestService: RequestsService) { }

    ngOnInit(): void {
        this.requestService.getRequestsList()
            .subscribe(requests => {
                this.requests = requests;
            });
    }
}
