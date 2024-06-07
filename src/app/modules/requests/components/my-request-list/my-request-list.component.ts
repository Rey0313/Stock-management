import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
    selector: 'app-my-request-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FontAwesomeModule],
    templateUrl: './my-request-list.component.html',
    styleUrl: './my-request-list.component.css',
    animations: [
        trigger('flipState', [
          state('active', style({
            transform: 'rotateY(180deg)'
          })),
          state('inactive', style({
            transform: 'rotateY(0)'
          })),
          transition('active => inactive', animate('600ms ease-out')),
          transition('inactive => active', animate('600ms ease-in'))
        ])
      ]
})

export class MyRequestListComponent {
    requests: any[] = [];
    flip: string = 'inactive';

    constructor(private requestService: RequestsService, private library: FaIconLibrary, private router: Router) {
        library.addIcons(faArrowLeft);
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
    
      toggleFlip() {
        this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
      }
}