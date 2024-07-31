import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logIn', 'activeSession']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.formLogin).toBeDefined();
    expect(component.formLogin instanceof FormGroup).toBe(true);
  });

  it('should toggle password visibility', () => {
    expect(component.showPass).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPass).toBe(true);
  });

  it('should handle login success', () => {
    const responseMock = {
      data: {
        role_id: '1',
        token: 'fakeToken',
        email: 'test@example.com'
      }
    };

    spyOn(localStorage, 'setItem');
    component.successHandler(responseMock.data);
    expect(localStorage.setItem).toHaveBeenCalledWith('rol', responseMock.data.role_id);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', responseMock.data.token);
    expect(localStorage.setItem).toHaveBeenCalledWith('email', responseMock.data.email);
  });

  it('should handle login error', () => {
    component.errorHandler({ error: { error: 'Contraseña incorrecta' } });
    expect(component.msjError).toBe('Usuario o contraseña incorrecto');
    
    component.errorHandler({ error: { error: 'Otro error' } });
    expect(component.msjError).toBe('Ha ocurrido un error, intentalo más tarde');
  });

  it('should submit login form successfully', () => {
    component.formLogin.setValue({ email: 'test@example.com', password: '123456', rememberUser: false });
    const responseMock = {
      data: {
        role_id: '1',
        token: 'fakeToken',
        email: 'test@example.com'
      }
    };

    authServiceSpy.logIn.and.returnValue(of(responseMock));
    component.login({ preventDefault: () => {} });
    expect(authServiceSpy.logIn).toHaveBeenCalled();
  });

  it('should handle login form submission error', () => {
    component.formLogin.setValue({ email: 'test@example.com', password: '123456', rememberUser: false });

    authServiceSpy.logIn.and.returnValue(throwError({ error: { error: 'Contraseña incorrecta' } }));
    component.login({ preventDefault: () => {} });
    expect(component.msjError).toBe('Usuario o contraseña incorrecto');
    expect(component.spinnerLoading).toBe(false);
  });
});
