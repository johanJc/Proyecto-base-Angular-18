import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { RecoverPasswordComponent } from './recover-password.component';
import { AuthService } from '../../../services/auth.service';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['sendVerificationCode', 'changePasswordOutside']);
    await TestBed.configureTestingModule({
      imports: [RecoverPasswordComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const form = component.form;
    expect(form).toBeDefined();
    expect(form.get('email').value).toBe('');
    expect(form.get('code').value).toBe('');
    expect(form.get('password').value).toBe('');
    expect(form.get('vPassword').value).toBe('');
  });

  it('should toggle password visibility', () => {
    expect(component.showPass).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPass).toBe(true);
    component.togglePasswordVisibility();
    expect(component.showPass).toBe(false);
  });

  it('should send email if form is valid', () => {
    component.form.get('email').setValue('test@example.com');
    authServiceMock.sendVerificationCode.and.returnValue(of({}));

    component.sendEmail();

    expect(authServiceMock.sendVerificationCode).toHaveBeenCalled();
    expect(component.spinnerLoading).toBe(false);
    expect(component.sentCode).toBe(true);
  });

  it('should not send email if form is invalid', () => {
    component.form.get('email').setValue('invalid-email');
    component.sendEmail();
    expect(authServiceMock.sendVerificationCode).not.toHaveBeenCalled();
  });

  it('should save new password if form is valid', () => {
    component.form.get('email').setValue('test@example.com');
    component.form.get('code').setValue('123456');
    component.form.get('password').setValue('password123');
    component.form.get('vPassword').setValue('password123');
    authServiceMock.changePasswordOutside.and.returnValue(of({}));

    component.saveNewPass();

    expect(authServiceMock.changePasswordOutside).toHaveBeenCalled();
    expect(component.spinnerLoading).toBe(false);
  });

  it('should not save new password if form is invalid', () => {
    component.form.get('email').setValue('');
    component.saveNewPass();
    expect(authServiceMock.changePasswordOutside).not.toHaveBeenCalled();
  });

  it('should handle error when sending email', () => {
    spyOn(component, 'errorHandler');
    component.form.get('email').setValue('test@example.com');
    authServiceMock.sendVerificationCode.and.returnValue(throwError({ error: { error: 'Error' } }));

    component.sendEmail();

    expect(component.errorHandler).toHaveBeenCalled();
    expect(component.spinnerLoading).toBe(false);
  });

  it('should handle error when saving new password', () => {
    spyOn(component, 'errorHandler');
    component.form.get('email').setValue('test@example.com');
    component.form.get('code').setValue('123456');
    component.form.get('password').setValue('password123');
    component.form.get('vPassword').setValue('password123');
    authServiceMock.changePasswordOutside.and.returnValue(throwError({ error: { error: 'Error' } }));

    component.saveNewPass();

    expect(component.errorHandler).toHaveBeenCalled();
    expect(component.spinnerLoading).toBe(false);
  });

  it('should handle mismatched passwords', () => {
    component.form.get('email').setValue('test@example.com');
    component.form.get('code').setValue('123456');
    component.form.get('password').setValue('password123');
    component.form.get('vPassword').setValue('differentPassword');

    component.saveNewPass();

    expect(authServiceMock.changePasswordOutside).not.toHaveBeenCalled();
  });

  it('should emit showLogin event', () => {
    spyOn(component.showLogin, 'emit');
    component.goToLogin();
    expect(component.showLogin.emit).toHaveBeenCalledWith(false);
  });

  it('should handle error correctly', () => {
    component.errorHandler({ error: { error: 'User does not exist' } });
    expect(component.msjError).toBe('Este correo no esta registrado');

    component.errorHandler({ error: { error: 'Invalid or expired verification code' } });
    expect(component.msjError).toBe('El código de seguridad no es correcto');

    component.errorHandler({ error: { error: 'Some other error' } });
    expect(component.msjError).toBe('Ha ocurrido un error, intentalo más tarde');
  });
});
