import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  try {
    const tokenExist = cookieService.check('token')
    if(!tokenExist) router.navigate(['/', 'auth']);
    return tokenExist;

  } catch (error: any) {
    console.log('Error!! ',error.message)
    return false
  }
};

