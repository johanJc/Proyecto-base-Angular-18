import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { SharedDataService } from '../services/shared/shared-data.service';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-inside',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, LoadingComponent, NavbarComponent],
  template: `
  @if (loading) {
    <app-loading/>
  }
  <div class="content-page">    
    <div class="sidebar {{expanded ? 'expanded': ''}}">
      <div class="handler-sidebar {{expanded ? 'expanded': ''}}" (click)="handlerShowSidebar()">
         <i class="fa-solid fa-chevron-right"></i>
      </div>
      <app-sidebar />
    </div>
    <div class="body-page {{expanded ? 'sidebar-expanded': 'sidebar-contracted'}}">
      <div class="navbar w-100">
        <app-navbar class="w-100"/>
      </div>
      <div class="w-100 container-routers b-scroll">
        <router-outlet />
      </div>
    </div>
  </div>    
  `,
  styles: [`

    `]
})
export class InsideComponent implements OnInit, OnDestroy {
  loading = false;
  expanded = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private sharedDataService: SharedDataService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.observerWidthScreen();
    this.sharedDataService.loadingObser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.loading = data;
        }
      });

    this.sharedDataService.showSidebar$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.expanded = data;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observerWidthScreen() {
    this.breakpointObserver.observe(['(max-width: 767px)'])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: BreakpointState) => {
        if(result.matches){        
          this.handlerShowSidebar(false);
          this.expanded = false;
        }
      });
  }

  handlerShowSidebar(show?) {
    this.sharedDataService.setShowSidebar = show ?? !this.expanded;
    console.log(this.expanded);
  }
}
