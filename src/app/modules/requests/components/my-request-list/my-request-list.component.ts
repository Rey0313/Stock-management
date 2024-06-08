import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-my-request-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FontAwesomeModule],
    templateUrl: './my-request-list.component.html',
    styleUrl: './my-request-list.component.css',
})

export class MyRequestListComponent {
    requests: any[] = [];

    constructor(private requestService: RequestsService, private library: FaIconLibrary, private router: Router, private titleService: Title) {
        library.addIcons(faArrowLeft);
        this.titleService.setTitle("Mes demandes - Material Manageur");
    }

    ngOnInit(): void {
        this.requestService.getMyRequestsList()
            .subscribe(requests => {
                this.requests = requests;
                console.log('Requests:', this.requests);
            });
    }

    goBack() {
        this.router.navigate(['/dashboard']);
      }
}