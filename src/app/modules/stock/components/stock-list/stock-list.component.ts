import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from '../../services/stock.service';
import { RequestsService } from '../../../requests/services/requests.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { RoomService } from '../../../rooms/services/room.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FontAwesomeModule, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  @ViewChild('assignModal', { static: true }) assignModalElement!: ElementRef;

  materialsList: any[] = [];
  groupedMaterials: { [type: string]: any[] } = {};
  rooms: any[] = [];
  selectedRoom: string | undefined;
  selectedMaterialId: string | undefined;
  isModalOpen = false;

  constructor(
    private stockService: StockService,
    private requestService: RequestsService,
    private library: FaIconLibrary,
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService

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

    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
      },
      error: (error) => {
        console.error('Error loading rooms:', error);
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

  openAssignModal(materialId: any) {
    this.selectedMaterialId = materialId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  assignMaterial() {
    if (this.selectedMaterialId && this.selectedRoom) {
      this.requestService.askAssigned(this.selectedMaterialId, this.selectedRoom).subscribe({
        next: (response) => {
          swal({
            title: 'Demande créée',
            text: 'Votre demande a bien été créée',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/dashboard']); 
          });
        },
        error: (error) => {
          console.error('Erreur lors de la création de la demande', error);
          swal({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de la demande',
            icon: 'error',
          });
        }
      });
    }
    this.closeModal();
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
