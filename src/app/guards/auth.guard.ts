
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    if(!JSON.parse(localStorage.getItem(next.params['id']) || 'false')) {
      return false
    } else {
      return true
    }
}
