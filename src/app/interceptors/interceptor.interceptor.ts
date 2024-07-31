import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SharedDataService } from '../services/shared/shared-data.service';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(SharedDataService); // Inyecta el servicio de carga
  loadingService.setLoading = true;
  return next(req).pipe(
    finalize(() => {
      loadingService.setLoading = false;
    })
  );
};
