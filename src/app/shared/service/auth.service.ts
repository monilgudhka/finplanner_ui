import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { FamilyService } from "./family.service";

@Injectable()
export class AuthService {
    private LOGIN_ID_KEY: string = 'login_id';

    constructor(private familyService: FamilyService) { }

    public signIn(loginId: string): boolean {
        const isSuccess = this.familyService.loadDetails(loginId);
        if (isSuccess) {
            localStorage.setItem(this.LOGIN_ID_KEY, loginId);
            return true;
        }
        return false;
    }

    public isSignedIn(): Observable<boolean> {
        return this.familyService.loadDetails(this.getLoginId())
            .pipe(tap(loadSuccess => {
                if (!loadSuccess) {
                    this.signOut();
                }
            }));
    }

    public getLoginId(): string {
        const loginId = localStorage.getItem(this.LOGIN_ID_KEY);
        return (loginId === null) ? '' : loginId;
    }

    public signOut() {
        localStorage.clear();
    }

}