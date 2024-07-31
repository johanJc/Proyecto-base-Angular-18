import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: '../login/login.component.scss'
})
export class RecoverPasswordComponent {
  @Output() showLogin = new EventEmitter();
  form: FormGroup;
  msjError = "";
  spinnerLoading = false;
  sentCode = false;
  showPass = false;

  constructor(formBuilder: FormBuilder, private authService: AuthService){
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/)]],
      code: ['', Validators.required],
      password: ['', Validators.required],
      vPassword: ['', Validators.required]
    })
  }

  /**
   * Vuelve a mostrar la vista del login
   */
  goToLogin(){
    this.showLogin.emit(false)
  }

  /**
 * La función `togglePasswordVisibility` alterna la visibilidad de un campo de entrada de contraseña 
 */
  togglePasswordVisibility(): void {
    this.showPass = !this.showPass;
    console.log(this.showPass)
  }

  /**
   * Envia el código de seguridad para recuperar la contraseña
   */
  sendEmail(){
    if(this.spinnerLoading){
      return;
    }

    if(this.form.get('email').invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.spinnerLoading = true;

    let email:string = this.form.get('email').value.toLowerCase().trim()
    let data = {
      email: email
    }

    this.authService.sendVerificationCode(data).subscribe({
      next: (response:any) => {
        this.sentCode = true;
        Swal.fire({
          icon: 'success',
          text: 'Correo enviado correctamente'
        })
        this.spinnerLoading = false;
      },
      error: (error) => {
        this.spinnerLoading = false;
        this.errorHandler(error);
      }
    })
  }

  /**
   * Guarda la nueva contraseña y antes hace las validaciones pernitentes
   */
  saveNewPass(){
    if(this.spinnerLoading){
      return;
    }

    if(this.form.get('code').invalid || this.form.get('password').invalid || this.form.get('vPassword').invalid){
      this.form.markAllAsTouched();
      return;      
    }    
    let code:string = this.form.get('code').value;
    let pass:string = this.form.get('password').value;
    let vPass:string = this.form.get('vPassword').value;
    let email:string = this.form.get('email').value.toLowerCase().trim()

    if(pass.trim() != vPass.trim()){
      Swal.fire({
        icon: 'warning',
        text: 'Las contraseñas no coinciden'
      })
      return;
    }

    this.spinnerLoading = true;

    let data = {
      email: email,
      code: code.trim(),
      passord: pass
    }

    this.authService.changePasswordOutside(data).subscribe({
      next: (response:any) => {
        this.spinnerLoading = false;
        Swal.fire({
          icon: 'success',
          text: 'Contraseña actualizada correctamente'
        }).then(() => {
          this.goToLogin();
        })        
      },
      error: (error) => {
        this.spinnerLoading = false;
        this.errorHandler(error);
      }
    })

  }

  /**
   * Limpia el mensaje de error
   */
  cleanError(){
    this.msjError = "";
  }

    /**
   * Maneja los posibles erroes devueltos por la Api en este componente
   * @param error error retornado.
   */
    errorHandler(error){
      let errorMsj = error.error.error;
      switch (errorMsj) {
        case "User does not exist":
          this.msjError = "Este correo no esta registrado";
          break;
        case "Invalid or expired verification code":
          this.msjError = "El código de seguridad no es correcto"
          break;
        default:
          this.msjError = "Ha ocurrido un error, intentalo más tarde";
          break;
      }
    }
}
