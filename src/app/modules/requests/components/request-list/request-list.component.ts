import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { MaterialsService } from '../../../materials/services/materials.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import swal from 'sweetalert';

@Component({
    selector: 'app-request-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FontAwesomeModule],
    templateUrl: './request-list.component.html',
    styleUrl: './request-list.component.css'
})

export class RequestListComponent {
    requests: any[] = [];
    filteredRequests: any[] = [];
    showPendingOnly: boolean = true;
    rejectionDescription: string = '';

    constructor(private requestService: RequestsService, private library: FaIconLibrary, private router: Router, private titleService: Title) {
        library.addIcons(faArrowLeft);
        this.titleService.setTitle("Liste des demandes - Material Manager");
    }

    ngOnInit(): void {
        this.loadRequests();
    }

    goBack() {
        this.router.navigate(['/dashboard-admin']);
    }

    loadRequests(): void {
        this.requestService.getRequestsList()
            .subscribe(requests => {
                this.requests = requests.map(request => {
                    request.status = this.transformStatus(request.status);
                    return request;
                });
                this.applyFilter();
            });
    }

    toggleFilter(): void {
        this.showPendingOnly = !this.showPendingOnly;
        this.applyFilter();
    }

    applyFilter(): void {
        if (this.showPendingOnly) {
            this.filteredRequests = this.requests.filter(request => request.status === 'En attente');
        } else {
            this.filteredRequests = this.requests;
        }
    }

    acceptAssign(requestId: any): void {
        this.requestService.acceptAssign(requestId)
            .subscribe({
                next: (response) => {
                    swal({
                        title: 'Demande acceptée',
                        text: 'La demande a été acceptée avec succès',
                        icon: 'success',
                      })
                    this.ngOnInit();
                },
                error: (error) => {
                    swal({
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors de l\'acceptation de la demande',
                        icon: 'error',
                      })
                    console.error('Erreur lors de l\'acceptation de la demande', error);
                }
            });
    }

    rejectAssign(requestId: any): void {
        this.requestService.rejectAssign(requestId)
            .subscribe({
                next: (response) => {
                    swal({
                        title: 'Demande refusée',
                        text: 'La demande a été refusée avec succès',
                        icon: 'success',
                      })
                    this.ngOnInit();
                },
                error: (error) => {
                    swal({
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors du refus de la demande',
                        icon: 'error',
                      })
                    console.error('Erreur lors du refus de la demande', error);
                }
            });
    }

    acceptReturn(requestId: any): void {
        this.requestService.acceptReturn(requestId)
            .subscribe({
                next: (response) => {
                    swal({
                        title: 'Retour accepté',
                        text: 'Le retour a été accepté avec succès',
                        icon: 'success',
                      })
                    this.ngOnInit();
                },
                error: (error) => {
                    swal({
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors de l\'acceptation du retour',
                        icon: 'error',
                      })
                    console.error('Erreur lors de l\'acceptation du retour', error);
                }
            });
    }

    rejectReturn(requestId: any): void {
        this.requestService.rejectReturn(requestId)
            .subscribe({
                next: (response) => {
                    swal({
                        title: 'Retour refusé',
                        text: 'Le retour a été refusé avec succès',
                        icon: 'success',
                      })
                    this.ngOnInit();
                },
                error: (error) => {
                    swal({
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors du refus du retour',
                        icon: 'error',
                      })
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
