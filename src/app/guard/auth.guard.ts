import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLogged.pipe(
    map(isLogged => {
      if (isLogged) {
        console.log("Logueado")
        return true;
      } else {
        console.log("No Logueado")
        router.navigate(['login']);
        return false;
      }
    })
  );
};
