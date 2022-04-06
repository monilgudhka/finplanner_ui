import { Injectable } from "@angular/core";
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

    public isSignedIn(): boolean {
        let isSigned: boolean = (localStorage.getItem(this.LOGIN_ID_KEY) !== null);
        if (isSigned) {
            isSigned = this.familyService.loadDetails(this.getLoginId());
            if (!isSigned) {
                this.signOut();
            }
        }
        return isSigned;
    }

    public getLoginId(): string {
        const loginId = localStorage.getItem(this.LOGIN_ID_KEY);
        return (loginId === null) ? '' : loginId;
    }

    public signOut() {
        localStorage.clear();
    }

}