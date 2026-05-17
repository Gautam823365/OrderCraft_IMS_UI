import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const auth = localStorage.getItem('token');
    if (auth) {
      return true; // ✅ user is logged in
    } else {
      this.router.navigate(['/login']).then(() => {
        window.location.reload(); // forces page reload to clear cached state
      });
      return false; // ❌ must return false
    }
  }
}
