import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Family } from "../model/family.model";
import { Growth } from "../model/growth.model";
import { GetBackendResourceService } from "./backend/get-backend-resource.service";
import { FamilyService } from "./family.service";

@Injectable()
export class GrowthHistoryService {

    growthHistory: Array<Growth>;
    private historySubject: Subject<Array<Growth>> = new Subject();
    private errorSubject: Subject<HttpErrorResponse> = new Subject();
    private errorSubscription: Subscription;
    private familySubscription: Subscription;

    constructor(
        private getResource: GetBackendResourceService,
        private familyService: FamilyService
    ) { }

    init(): void {
        this.errorSubscription = this.familyService.subscribeError(error => this.registerError(error));
        this.familySubscription = this.familyService.subscribeFamily(family => this.registerFamily(family));
    }

    destroy(): void {
        this.errorSubscription.unsubscribe();
        this.familySubscription.unsubscribe();
    }

    // subscribe methods
    subscribeGrowthHistory(next: (value: Array<Growth>) => void): Subscription {
        return this.historySubject.subscribe(next);
    }

    subscribeError(next: (value: HttpErrorResponse) => void): Subscription {
        return this.errorSubject.subscribe(next);
    }

    getGrowthHistory(): Array<Growth> {
        return this.growthHistory;
    }

    private registerError(error: HttpErrorResponse) {
        this.errorSubject.next(error);
    }

    private registerFamily(family: Family) {
        this.getResource.getGrowthHistory(family.getGrowth().getId())
            .subscribe({
                next: (history: Array<Growth>) => this.registerHistory(history),
                error: (error: HttpErrorResponse) => this.registerError(error)
            });
    }

    private registerHistory(history: Array<Growth>) {
        this.growthHistory = history;
        this.historySubject.next(this.growthHistory);
    }

}