import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-my-request-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './my-request-list.component.html',
    styleUrl: './my-request-list.component.css'
})

export class MyRequestListComponent {
    requests: any[] = [];

    constructor(private requestService: RequestsService) { }

    ngOnInit(): void {
        this.requestService.getMyRequestsList()
            .subscribe(requests => {
                this.requests = requests;
            });
    }
}