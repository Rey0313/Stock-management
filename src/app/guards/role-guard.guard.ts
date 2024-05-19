import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../modules/authentication/services/auth.service';

export const canActivateRole: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data['roles'];
    if (requiredRoles.includes(currentUser.role)) {
      return true;
    }

    router.navigate(['/']);
    return false;
};
