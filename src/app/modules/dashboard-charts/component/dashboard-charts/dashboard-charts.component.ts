import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { MaterialsService } from '../../../materials/services/materials.service';
import { RoomService } from '../../../rooms/services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.css'
})
export class DashboardChartsComponent {
  @ViewChild('materialsByTypeChart') materialsByTypeChart!: ElementRef;
  rooms: any[] = [];
  isModalOpen = false;
  roomName: string = '';
  usedMaterials: any[] = [];
  totalMaterials: number = 0;
  totalUsedMaterials: number = 0;
  showAllRooms: boolean = false; 

  constructor(private materialService: MaterialsService, private roomService: RoomService, private library: FaIconLibrary) {
    Chart.register(BarController, CategoryScale, LinearScale, BarElement);
    this.library.addIcons(faChevronDown, faChevronUp);
  }

  ngOnInit() {
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
      },
      error: (error) => {
        console.error('Error loading rooms:', error);
      }
    });

    this.getUsedMaterials();
  }

  ngAfterViewInit() {
    this.getMaterialsByTypeData();
  }

  getMaterialsByTypeData() {
    this.materialService.getMaterialsByType().subscribe(data => {
      this.totalMaterials = data.values.reduce((sum: number, value: number) => sum + value, 0);
      const chartData = {
        labels: data.labels,
        datasets: [
          {
            label: 'Nombre de Matériels',
            data: data.values,
            backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(50, 49, 165, 0.5)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(50, 49, 165, 1)'],
            borderWidth: 1,
          },
        ],
      };
      this.renderMaterialsByTypeChart(chartData);
    });
  }

  renderMaterialsByTypeChart(data: any) {
    const options: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          }
        }
      }
    };

    new Chart(this.materialsByTypeChart.nativeElement, {
      type: 'bar',
      data: data,
      options: options,
    });
  }

  openRoomModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createRoom() {
    if (this.roomName.trim()) {
      this.roomService.addRoom(this.roomName).subscribe({
        next: (newRoom) => {
          swal({
            title: 'Salle ajoutée avec succès',
            text: 'La salle ' + newRoom.name + ' a été ajoutée avec succès',
            icon: 'success',
          });
          this.rooms.push(newRoom);
          this.closeModal();
          this.roomName = '';
        },
        error: (error) => {
          swal({
            title: 'Erreur',
            text: 'Erreur lors de l\'ajout de la salle',
            icon: 'error',
          });
          console.error('Error adding room:', error);
        }
      });
    }
  }

  getUsedMaterials() {
    this.materialService.getUsedMaterials().subscribe({
      next: (usedMaterials) => {
        this.totalUsedMaterials = usedMaterials.length;
        this.usedMaterials = usedMaterials.sort((a, b) => a.type.localeCompare(b.type));
      },
      error: (error) => {
        console.error('Error loading used materials:', error);
      }
    });
  }

  toggleRoomList() {
    this.showAllRooms = !this.showAllRooms;
  }

}