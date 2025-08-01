import { CanLoadFn, Route, Router, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuardLoad: CanLoadFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  return isLoggedIn ? isLoggedIn : inject(Router).createUrlTree(['/logowanie']);
};
