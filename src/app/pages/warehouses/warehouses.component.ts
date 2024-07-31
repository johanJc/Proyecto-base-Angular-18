import { Component } from '@angular/core';
import { SharedDataService } from '../../services/shared/shared-data.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.scss'
})
export class WarehousesComponent {
  page = 1;
  pageSize = 10;

  listWarehouses = [
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    },
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    },
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    },
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    },
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    },
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    },
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    },
    {
      id: 1,
      name: "Bodega 1",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Conectada',      
    },
    {
      id: 2,
      name: "Bodega 2",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Inactiva',      
    },
    {
      id: 3,
      name: "Bodega 3",
      address: 'Calle 98',
      city: 'Barranquilla',
      department: 'Atlantico',
      accessZones: 5,
      unloadingZones: 7,
      warehousesStatus: 'Desconectada',      
    }
  ]
  constructor(private sharedData: SharedDataService){}

  ngOnInit(){
    this.sharedData.setInfoCurrentPage({ name: 'Bodegas', description: 'Bienvenido a tu listado de bodegas' });
  }
}
