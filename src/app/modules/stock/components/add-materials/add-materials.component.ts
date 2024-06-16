import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-add-materials',
    standalone: true,
    imports: [FormsModule, CommonModule, FontAwesomeModule],
    templateUrl: './add-materials.component.html',
    styleUrl: './add-materials.component.css'
})
export class AddMaterialsComponent {

    noSwitchSelected: boolean = false;

    constructor(
        private stockService: StockService,
        private router: Router,
        private library: FaIconLibrary
    ) { 
        library.addIcons(faArrowLeft);
    }

    onSubmit(form: NgForm) {
        this.noSwitchSelected = !this.atLeastOneSelected(form);

        if (form.valid && !this.noSwitchSelected) {
            const formData = { 
                ...form.value,
                room : "66300e083db89c85b82fb93e",
                isStored: true,
                assignments: null,
                access: {
                    membre: form.value.member || false,
                    organisme: form.value.organization || false,
                    admin: true
                  }
            };
            this.stockService.addMaterial(formData).subscribe({
                next: (material) => {
                    this.router.navigate(['/stock-list']);
                },
                error: (error) => console.error(error)
            });
        } else {
            this.markFormControlsAsTouched(form);
        }
    }

    markFormControlsAsTouched(form: NgForm) {
        Object.keys(form.controls).forEach(controlName => {
          form.controls[controlName].markAsTouched();
        });
      }

    atLeastOneSelected(form: NgForm): boolean {
        return form.value.member || form.value.organization;
    }
    
    goBack() {
        this.router.navigate(['/stock-list']); 
    }
}
