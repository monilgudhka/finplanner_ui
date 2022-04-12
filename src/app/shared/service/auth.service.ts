import { Injectable } from "@angular/core";
import { Family } from "../model/family.model";
import { Family2Service } from "./family2.service";

@Injectable()
export class AuthService {
    private LOGIN_ID_KEY: string = 'login_id';
    private signedIn: boolean = false;

    constructor(private familyService: Family2Service) {
        familyService.subscribeFamily(family => this.signIn(family));
        familyService.subscribeError(error => this.signOut());
    }

    private signIn(family: Family) {
        localStorage.setItem(this.LOGIN_ID_KEY, family.getLoginId());
        this.signedIn = true;
    }

    // public signIn(loginId: string) {
    //     this.familyService.load(loginId);
    //     const isSuccess = this.familyService.loadDetails(loginId);
    //     if (isSuccess) {

    //         return true;
    //     }
    //     return false;
    // }

    public isSignedIn(): boolean {
        return this.signedIn;
    }

    private getLoginId(): string {
        const loginId = localStorage.getItem(this.LOGIN_ID_KEY);
        return (loginId === null) ? '' : loginId;
    }

    public signOut() {
        localStorage.clear();
        this.signedIn = false;
    }

}