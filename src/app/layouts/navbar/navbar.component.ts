import { Component } from '@angular/core';
import { SharedDataService } from '../../services/shared/shared-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  suscribeInfoPage;
  currentPageInfo;
  initials;
  constructor(private sharedData: SharedDataService){}

  ngOnInit(){
    this.suscribeDataPage();
    this.getInitials();;
  }

  suscribeDataPage(){
    this.suscribeInfoPage = this.sharedData.infoCurrentPage$.subscribe(info => {
      this.currentPageInfo = info;
    });
  }

  getInitials(){
    let name:string = localStorage.getItem('name')
    let last_name:string = localStorage.getItem('last_name')
    this.initials = name.slice(0,1) + "" + last_name.slice(0,1);
    this.initials = this.initials.toLocaleUpperCase();
  }


  ngOnDestroy(){
    this.suscribeInfoPage.unsubscribe();
  }
}
