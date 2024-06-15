import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from '../../services/stock.service';
import { RequestsService } from '../../../requests/services/requests.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FontAwesomeModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  materialsList: any[] = [];
  groupedMaterials: { [type: string]: any[] } = {};

  constructor(
    private stockService: StockService,
    private requestService: RequestsService,
    private library: FaIconLibrary,
    private router: Router,
    private authService: AuthService
  ) {
    library.addIcons(faArrowLeft, faPlus);
  }

  ngOnInit(): void {
    this.stockService.getMaterialsList().subscribe({
      next: (materialsList) => {
        this.materialsList = materialsList;
        this.groupMaterialsByType();
      },
      error: (error) => {
        console.error('Error loading materials:', error);
      }
    });
  }

  private groupMaterialsByType() {
    this.groupedMaterials = this.materialsList.reduce((acc, material) => {
      const type = material.type || 'Unknown';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(material);
      return acc;
    }, {});
  }

  askAssigned(materialId: any) {
    this.requestService.askAssigned(materialId).subscribe({
      next: (response) => {
        console.log('Demande créée avec succès', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la demande', error);
      }
    });
  }

  deleteMaterial(materialId: any) {
    this.stockService.deleteMaterial(materialId).subscribe({
      next: () => {
        this.materialsList = this.materialsList.filter(material => material._id !== materialId);
        this.groupMaterialsByType();
        console.log('Matériel supprimé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du matériel', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  navigateToAddMaterial() {
    this.router.navigate(['/add-material']);
  }
}
