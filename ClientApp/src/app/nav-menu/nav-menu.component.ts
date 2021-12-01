import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private authorizeService: AuthService,
    private _router: Router
    ) { }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authorizeService.logout();
    this._router.navigate(['/logear']);
  }
  
  userName(): string {
    return this.authorizeService.getUserName();
  }
  public isAuthenticated(): boolean
  {
      return this.authorizeService.isAuthenticated();
  }

  isAuthenticatedRole(role: string): boolean {
      if (this.isAuthenticated && role != null ) {
          return this.authorizeService.hasRole(role);
      }
  }
}
