import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsService } from '../../services/materials.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-assigned-materials',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, FontAwesomeModule ],
  templateUrl: './assigned-materials.component.html',
  styleUrls: ['./assigned-materials.component.css'],
})
export class AssignedMaterialsComponent {
  groupedAssignedMaterials: { [type: string]: any[] } = {};

  constructor(private materialService: MaterialsService, private library: FaIconLibrary, private router: Router, private titleService: Title) {
    library.addIcons(faArrowLeft);
    this.titleService.setTitle("Matériels assignés - Material Manageur");
  }

  ngOnInit(): void {
    this.materialService.getAssignedMaterials()
      .subscribe(assignedMaterials => {
        this.groupMaterialsByType(assignedMaterials);
      });
  }

  private groupMaterialsByType(assignedMaterials: any[]) {
    this.groupedAssignedMaterials = assignedMaterials.reduce((acc, materialGroup) => {
      const type = materialGroup._id || 'Unknown';
      acc[type] = materialGroup.materials;
      return acc;
    }, {});
  }

  isAssignedMaterialsEmpty(): boolean {
    return Object.keys(this.groupedAssignedMaterials).length === 0;
  }
  
  askReturn(materialId: any) {
    this.materialService.askReturn(materialId)
      .subscribe({
        next: (response) => {
          console.log('Demande de retour créée avec succès', response);
        },
        error: (error) => {
          console.error('Erreur lors de la création de la demande de retour', error);
        }
      });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
