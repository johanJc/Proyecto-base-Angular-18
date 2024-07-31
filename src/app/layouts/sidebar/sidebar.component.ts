import { Component } from '@angular/core';
import { RouterLinkComponent } from '../router-link/router-link.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { SharedDataService } from '../../services/shared/shared-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  initials: string;
  suscribeShowSidbar;
  expanded;
  name:string;
  lastname:string;
  constructor(private authService: AuthService, private sharedDataService: SharedDataService){}

  ngOnInit(){
    this.getInitials();
    this.observeShowSidebar();
  }
  
  observeShowSidebar(){
    this.suscribeShowSidbar = this.sharedDataService.showSidebar$.subscribe({
      next: (data: any) => {
        this.expanded = data;
      }
    })
  }

  ngOnDestroy(){
    this.suscribeShowSidbar.unsubscribe();
  }

  getInitials(){
    this.name = localStorage.getItem('name')
    this.lastname = localStorage.getItem('last_name')
    this.initials = this.name.slice(0,1) + "" + this.lastname.slice(0,1);
    this.initials = this.initials.toLocaleUpperCase();
  }

  logOut(){
    Swal.fire({
      icon: 'question',
      text: '¿Está seguro de cerrar sesión?',
      confirmButtonText: 'Si, cerrar sesión',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((action) => {
      if(action.isConfirmed){
        this.authService.logOut().subscribe({
          next: (data) => {
            
          }
        })
      }
    })
  }
}
