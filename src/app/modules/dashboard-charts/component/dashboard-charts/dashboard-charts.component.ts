import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataset, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { MaterialsService } from '../../../materials/services/materials.service';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.css'
})
export class DashboardChartsComponent {
  @ViewChild('materialsByTypeChart') materialsByTypeChart! : ElementRef;

  constructor(private materialService: MaterialsService) {
    Chart.register(BarController, CategoryScale, LinearScale, BarElement);
  }

  ngAfterViewInit() {
    this.getMaterialsByTypeData();
  }

  getMaterialsByTypeData() {
    this.materialService.getMaterialsByType().subscribe(data => {
      const chartData = {
        labels: data.labels,
        datasets: [
          {
            label: 'Nombre de Matériels',
            data: data.values,
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
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
}