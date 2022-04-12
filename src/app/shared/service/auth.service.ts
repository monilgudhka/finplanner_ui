import { Injectable } from "@angular/core";
import { Family } from "../model/family.model";
import { Family2Service } from "./family2.service";

@Injectable()
export class AuthService {
    private LOGIN_ID_KEY: string = 'login_id';
    private signedIn: boolean = false;

    constructor(private familyService: Family2Service) { }

    public init(): void {
        this.familyService.subscribeFamily(family => this.signIn(family));
        this.familyService.subscribeError(error => this.signOut());

        const loginId = localStorage.getItem(this.LOGIN_ID_KEY);
        if (loginId !== null) {
            this.familyService.load(loginId);
        }
    }

    private signIn(family: Family) {
        console.log('inside signIn');
        localStorage.setItem(this.LOGIN_ID_KEY, family.getLoginId());
        this.signedIn = true;
    }

    public isSignedIn(): boolean {
        return this.signedIn;
    }

    public signOut() {
        localStorage.clear();
        this.signedIn = false;
    }

}