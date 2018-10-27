import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}


  canActivate(): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    
    //this.authService.login
    console.log(this.authService.isLoggedIn);
    
    if (this.authService.isLoggedIn) { 
      console.log("authGuard");
      //this.router.navigate(['/home']);
      return true; 
    }

    // Store the attempted URL for redirecting
    

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
