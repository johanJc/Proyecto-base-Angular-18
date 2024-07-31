import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared/shared-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private sharedData: SharedDataService){
    let nameUser = localStorage.getItem('name');
    this.sharedData.setInfoCurrentPage({ name: 'Hola, '+nameUser+"", description: 'Bienvenido a tu tablero de estadísticas diarias' });
  }
}
