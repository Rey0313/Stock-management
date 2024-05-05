import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from '../../services/stock.service';

@Component({
    selector: 'app-stock-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './stock-list.component.html',
    styleUrl: './stock-list.component.css'
})


export class StockListComponent {
    materialsList: any[] = [];
    groupedMaterials: { [type: string]: any[] } = {};

    constructor(private stockService: StockService) { }

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
          const type = material.type || 'Unknown'; // Use 'name' if it's supposed to be 'name'
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(material);
          return acc;
        }, {});
      }
}
