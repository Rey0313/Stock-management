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

    constructor(
        private stockService: StockService,
        private router: Router,
        private library: FaIconLibrary
    ) { 
        library.addIcons(faArrowLeft);
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const formData = { 
                ...form.value,
                room : "66300e083db89c85b82fb93e",
                isStored: true,
                assignments: null
            };
            this.stockService.addMaterial(formData).subscribe({
                next: (material) => {
                    this.router.navigate(['/stock-list']);
                },
                error: (error) => console.error(error)
            });
        }
    }
    
    goBack() {
        this.router.navigate(['/stock-list']); 
      }

}
