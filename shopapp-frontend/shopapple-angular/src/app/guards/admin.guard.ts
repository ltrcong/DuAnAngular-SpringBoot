import { inject, Injectable } from "@angular/core";
import { UserResponse } from "../responses/user/user.response";
import { TokenService } from "../services/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard {
    userResponse?:UserResponse | null;
    constructor(
      private tokenService: TokenService, 
      private router: Router,
      private userService:UserService 
    ) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const isTokenExpired = this.tokenService.isTokenExpired();
      const isUserIdValid = this.tokenService.getUserId() > 0;
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
      const isAdmin = this.userResponse?.role.name == 'admin';
      debugger
      if (!isTokenExpired && isUserIdValid && isAdmin) {
        return true;
      } else {
        // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
        // Ví dụ trả về trang login:
        this.router.navigate(['/login']);
        return false;
      }
    }  
  }
  
  export const AdminGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean => {
    debugger
    return inject(AdminGuard).canActivate(next, state);
  }
  