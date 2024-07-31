import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor() { }

  //CONTROL DEL LOADING
  private _loading: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  // Subscripción al loading  
  get loadingObser() {
    return this._loading.asObservable();
  }
  // Mostrar u ocultar el loading
  set setLoading(showLoading: boolean) {
    this._loading.next(showLoading);
  }


  //CONTROL DE LO QUE SE MUESTRA EN LA NAVBAR POR CADA SECCIÓN DE LA PAGINA
  private infoCurrentPage: BehaviorSubject<any> = new BehaviorSubject<any>({ name: '', description: '' });

  infoCurrentPage$ = this.infoCurrentPage.asObservable();
  setInfoCurrentPage(info: { name: string; description: string }) {
    this.infoCurrentPage.next(info);
  }

  //CONTROL DEL ANCHO DEL SIDEBAR
  private showSidebar: BehaviorSubject<any> = new BehaviorSubject<any>(true);

  showSidebar$ = this.showSidebar.asObservable();
  set setShowSidebar(showLoading: boolean) {
    this.showSidebar.next(showLoading);
  }
}
