import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const injectSessionInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const coockieService = inject(CookieService);
  try {
    const token = coockieService.check('token')
    let newRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    })
    return next(newRequest);

  } catch (error) {
    console.log('🥲 Error!', error)
    return next(req)
  }
};
