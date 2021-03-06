import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {
  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.isAuthenticated()) {
    
        if (next.data!=null && next.data.role!=null)
        {
            return this._authService.hasRole(next.data.role);
        }
        return true;
    }
    this._router.navigate(['/logear']);
    return false;
    }
}
