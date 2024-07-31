import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDataService } from '../../services/shared/shared-data.service';

@Component({
  selector: 'app-router-link',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './router-link.component.html',
  styleUrl: './router-link.component.scss'
})
export class RouterLinkComponent {
  suscribeShowSidbar;
  expanded;
  constructor(private sharedDataService: SharedDataService){}

  ngOnInit(){
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
}
