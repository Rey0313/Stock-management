import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { MaterialsService } from '../../../materials/services/materials.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-request-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FontAwesomeModule],
    templateUrl: './request-list.component.html',
    styleUrl: './request-list.component.css'
})

export class RequestListComponent {
    requests: any[] = [];
    rejectionDescription: string = '';

    constructor(private requestService: RequestsService, private library: FaIconLibrary, private router: Router, private titleService: Title) {
        library.addIcons(faArrowLeft);
        this.titleService.setTitle("Liste des demandes - Material Manageur");
    }

    ngOnInit(): void {
        this.loadRequests();
    }

    goBack() {
        this.router.navigate(['/dashboard']);
      }

    loadRequests(): void {
        this.requestService.getRequestsList()
            .subscribe(requests => {
                this.requests = requests.map(request => {
                    request.status = this.transformStatus(request.status);
                    return request;
                });
            });
    }

    acceptAssign(requestId: any): void {
        this.requestService.acceptAssign(requestId)
            .subscribe({
                next: (response) => {
                    console.log('Demande acceptée avec succès', response);
                    this.ngOnInit();
                },
                error: (error) => {
                    console.error('Erreur lors de l\'acceptation de la demande', error);
                }
            });
    }

    rejectAssign(requestId: any): void {
        this.requestService.rejectAssign(requestId)
            .subscribe({
                next: (response) => {
                    console.log('Demande refusée avec succès', response);
                    this.ngOnInit();
                },
                error: (error) => {
                    console.error('Erreur lors du refus de la demande', error);
                }
            });
    }

    acceptReturn(requestId: any): void {
        this.requestService.acceptReturn(requestId)
            .subscribe({
                next: (response) => {
                    console.log('Retour accepté avec succès', response);
                    this.ngOnInit();
                },
                error: (error) => {
                    console.error('Erreur lors de l\'acceptation du retour', error);
                }
            });
    }

    rejectReturn(requestId: any): void {
        this.requestService.rejectReturn(requestId)
            .subscribe({
                next: (response) => {
                    console.log('Retour refusé avec succès', response);
                    this.ngOnInit();
                },
                error: (error) => {
                    console.error('Erreur lors du refus du retour', error);
                }
            });
    }

    transformStatus(status: string): string {
        switch (status) {
            case 'en_attente':
                return 'En attente';
            default:
                return status;
        }
    }
}
