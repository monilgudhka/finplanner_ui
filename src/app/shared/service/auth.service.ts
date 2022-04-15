import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { Family } from "../model/family.model";
import { FamilyService } from "./family.service";

@Injectable()
export class AuthService {
    private LOGIN_ID_KEY: string = 'login_id';
    private signedIn: boolean = false;
    private familySubscription: Subscription;
    private errorSubscription: Subscription;

    private initializing?: Promise<boolean>;
    private initializeResolve?: (value: boolean | PromiseLike<boolean>) => void;

    constructor(private familyService: FamilyService) { }

    init(): void {
        this.familySubscription = this.familyService.subscribeFamily(family => this.signIn(family));
        this.errorSubscription = this.familyService.subscribeError(error => this.signOut());

        const loginId = localStorage.getItem(this.LOGIN_ID_KEY);
        if (loginId !== null) {
            this.initializing = new Promise<boolean>((resolve, reject) => this.initializeResolve = resolve);
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
        this.resetInitializeData(true);
    }

    isSignedIn(): boolean | Promise<boolean> {
        if (this.initializing !== undefined) {
            return this.initializing;
        }
        return this.signedIn;
    }

    signOut() {
        localStorage.clear();
        this.signedIn = false;
        this.resetInitializeData(false);
    }

    resetInitializeData(signed: boolean) {
        if (this.initializeResolve !== undefined) {
            this.initializeResolve(signed);
        }
        this.initializing = undefined;
        this.initializeResolve = undefined;
    }

}