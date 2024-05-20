import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsService } from '../../services/materials.service';

@Component({
  selector: 'app-assigned-materials',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './assigned-materials.component.html',
  styleUrl: './assigned-materials.component.css'
})
export class AssignedMaterialsComponent {
  groupedAssignedMaterials: { [type: string]: any[] } = {};

  constructor(private materialService: MaterialsService) { }

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

}
