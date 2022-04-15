import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const signedIn: boolean | Promise<boolean> = this.authService.isSignedIn();
        if (typeof signedIn === "boolean") {
            this.checkSignedIn(signedIn);
            return true;
        } else {
            return signedIn.then((isSigned) => {
                this.checkSignedIn(isSigned);
                return true;
            });
        }
    }

    private checkSignedIn(signedIn: boolean): void {
        if (!signedIn) {
            this.router.navigate(['/signin']);
        }
    }

}