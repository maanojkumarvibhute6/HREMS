import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { URL_ROUTES } from '../constants/url.constant';
import { TokenStorageService } from '../services/token-storage-service';
import { TOKEN_KEY } from '../constants/token-key.constant';

export const authGuard: CanActivateFn = () => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);


  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = tokenStorageService.getItem(TOKEN_KEY.TOKEN);
  if (token) {
    return true;
  }

  return router.createUrlTree([URL_ROUTES.AUTH.LOGIN]);
};
