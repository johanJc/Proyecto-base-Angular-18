import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RecoverPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup
  showPass = false;
  msjError = "";
  spinnerLoading = false;
  showRecoverPassword = false;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/)]],
      password: ['', Validators.required],
      rememberUser: [false]
    })
  }

  ngOnInit(){

    let currentUrl = this.router.url;
    if(currentUrl == '/recover-password'){
      // Va a recuperar contraseña
      this.showRecoverPassword = true;
      return;
    }else{
      this.showRecoverPassword = false;
    }
    console.log("Ruta actual:", currentUrl); 

    let token = localStorage.getItem('token');
    if(token != undefined){
      // Hay una sesión ya iniciada.
      this.authService.activeSession();
      return;
    }

    // Comprobamos si hay datos almacenado por recordar
    let userR = localStorage.getItem('userRemember');
    let passR = localStorage.getItem('passRemember');
    if(userR && passR){
      this.formLogin.get('email').setValue(userR);
      this.formLogin.get('password').setValue(passR);
      this.formLogin.get('rememberUser').setValue(true);
    }
  }

  recoverPassword(show){    
    this.showRecoverPassword = show;
  }
  
/**
 * La función `togglePasswordVisibility` alterna la visibilidad de un campo de entrada de contraseña 
 */
  togglePasswordVisibility(): void {
    this.showPass = !this.showPass;
    console.log(this.showPass)
  }

/**
 * Maneja el envío de formularios para el inicio de sesión del usuario, incluida la validación, 
 * el envío de datos al servicio de autenticación y el manejo de respuestas de éxito o error.
 * @param event - El parámetro "evento" en la función "iniciar sesión" es un objeto de evento que se
 * pasa cuando se activa el evento de inicio de sesión
 */
  login(event){
    event.preventDefault();

    if(this.spinnerLoading){
      return;
    }

    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return;
    }    

    this.spinnerLoading = true;
    let user:string = this.formLogin.get('email').value;
    let password:string = this.formLogin.get('password').value;

    let data = {
      user: user.trim().toLowerCase(),
      password: password.trim()
    }

    this.authService.logIn(data).subscribe({
      next: (response:any) => {
        if(this.formLogin.get('rememberUser').value === true){
          localStorage.setItem('userRemember', data.user)
          localStorage.setItem('passRemember', data.password)
        }else{
          localStorage.removeItem('userRemember')
          localStorage.removeItem('passRemember')
        }
        this.successHandler(response.data)
        this.spinnerLoading = false;
      },
      error: (error) => {
        this.spinnerLoading = false;
        this.errorHandler(error);
      }
    })
  }

/**
 * Almacena el ID de rol, el token y el correo electrónico en el
 * almacenamiento local.
 * @param data - data retornada por la api al iniciar sesión
 */
  successHandler(data){
    localStorage.setItem('rol', data.role_id)
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    localStorage.setItem('name', data.name)
    localStorage.setItem('last_name', data.last_name)
    this.authService.activeSession();
  }

  /**
   * Maneja los posibles erroes devueltos por la Api en este componente
   * @param error error retornado.
   */
  errorHandler(error){
    let errorMsj = error.error.error;
    switch (errorMsj) {
      case "Contraseña incorrecta":
        this.msjError = "Usuario o contraseña incorrecto";
        break;
      case "Password wrong":
        this.msjError = "Usuario o contraseña incorrecto";
        break;
      default:
        this.msjError = "Ha ocurrido un error, intentalo más tarde";
        break;
    }
  }
}
