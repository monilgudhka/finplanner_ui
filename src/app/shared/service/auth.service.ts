import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { Family } from "../model/family.model";
import { Family2Service } from "./family2.service";

@Injectable()
export class AuthService {
    private LOGIN_ID_KEY: string = 'login_id';
    private signedIn: boolean = false;
    private familySubscription: Subscription;
    private errorSubscription: Subscription;

    constructor(private familyService: Family2Service) { }

    init(): void {
        this.familySubscription = this.familyService.subscribeFamily(family => this.signIn(family));
        this.errorSubscription = this.familyService.subscribeError(error => this.signOut());

        const loginId = localStorage.getItem(this.LOGIN_ID_KEY);
        if (loginId !== null) {
            this.familyService.load(loginId);
        }
    }

    destroy(): void {
        this.errorSubscription.unsubscribe();
        this.familySubscription.unsubscribe();
    }

    private signIn(family: Family) {
        localStorage.setItem(this.LOGIN_ID_KEY, family.getLoginId());
        this.signedIn = true;
    }

    isSignedIn(): boolean {
        return this.signedIn;
    }

    signOut() {
        localStorage.clear();
        this.signedIn = false;
    }

}