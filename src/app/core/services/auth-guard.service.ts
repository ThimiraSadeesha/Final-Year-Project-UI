import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import {AuthService} from '.'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isUserExist()) {
      return true; // Allow access to the route for authenticated users
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Do not allow access for unauthenticated users
    }
  }
}

