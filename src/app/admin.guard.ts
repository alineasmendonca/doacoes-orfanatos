import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './components/views/login/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isAdmin : boolean = false;

  constructor (
    private authService : AuthService,
    private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      this.isAdmin = this.authService.isAdmin();
      
      if (this.isAdmin) {
        return true;
      } else {
        this.router.navigate(['/home'])
        return false;
      }
  }
  
}
