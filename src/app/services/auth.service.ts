import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new ReplaySubject<boolean>(1);
  isLogged = this.logged.asObservable();

  constructor(private http: HttpClient,
    private router: Router) {
    if (localStorage.getItem('token') != undefined) {
      this.logged.next(true);
    } else {
      this.logged.next(false);
    }
  }
  env = environment;

  logIn(data): Observable<any> {

    var headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    const dataJson =
    {
      "email": data.user,
      "password": data.password
    }
    const data_convert_json = JSON.stringify(dataJson)
    const url = this.env.api + 'login'
    return this.http.post(url, data_convert_json, { headers: headers })
  }


  activeSession() {
    this.logged.next(true);
    this.router.navigate(['./dashboard'])
  }

  sendVerificationCode(data): Observable<any> {
    var headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    const dataJson =
    {
      "email": data.email
    }
    const data_convert_json = JSON.stringify(dataJson)
    const url = this.env.api + 'send_verification_code'
    return this.http.post(url, data_convert_json, { headers: headers })
  }

  changePasswordOutside(data): Observable<any> {
    var headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    const dataJson =
    {
      "email": data.email,
      "new_password": data.passord,
      "verification_code": data.code
    }
    const data_convert_json = JSON.stringify(dataJson)
    const url = this.env.api + 'change_password'
    return this.http.post(url, data_convert_json, { headers: headers })
  }


  logOut(): Observable<any> {
    var headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': localStorage.getItem('token')
    });
    const url = this.env.api + `log_out`
    this.logOutHandler();
    return this.http.get<any>(url, { headers: headers })
  }

  async logOutHandler() {
    this.logged.next(false);
    // Comprobamos si hay datos almacenado por recordar
    let userR = localStorage.getItem('userRemember');
    let passR = localStorage.getItem('passRemember');
    await this.clearLocalStorage();
    await this.setRememberStorage(userR, passR);
    this.router.navigate(['./login'])
  }

  clearLocalStorage(): Promise<any>{
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve(true)
    })
  }

  setRememberStorage(userR, passR): Promise<any>{
    return new Promise((resolve, reject) => {
      if(userR && passR){
        localStorage.setItem('userRemember', userR);
        localStorage.setItem('passRemember', passR);
        resolve(true)
      }else{
        resolve(true)
      }
      
    })
  }
}
