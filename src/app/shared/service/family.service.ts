import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Family } from "../model/family.model";
import { CreateBackendResourceService } from "./backend/create-backend-resource.service";
import { GetBackendResourceService } from "./backend/get-backend-resource.service";
import { SnapshotBackendService } from "./backend/snapshot-backend.service";

@Injectable()
export class FamilyService {

    private family: Family;
    private familySubject: Subject<Family> = new Subject();
    private errorSubject: Subject<HttpErrorResponse> = new Subject();

    constructor(
        private createResource: CreateBackendResourceService,
        private getResource: GetBackendResourceService,
        private snapshotService: SnapshotBackendService
    ) { }

    subscribeFamily(next: (value: Family) => void): Subscription {
        return this.familySubject.subscribe(next);
    }

    subscribeError(next: (value: HttpErrorResponse) => void): Subscription {
        return this.errorSubject.subscribe(next);
    }

    getFamily(): Family {
        return this.family;
    }

    create(loginId: string) {
        this.createResource
            .createFamily(loginId)
            .subscribe({
                next: (family: Family) => this.registerFamily(family),
                error: (error: HttpErrorResponse) => this.registerError(error)
            });
    }

    load(loginId: string) {
        this.getResource
            .getFamily(loginId)
            .subscribe({
                next: (family: Family) => this.registerFamily(family),
                error: (error: HttpErrorResponse) => this.registerError(error)
            });
    }

    reload() {
        this.load(this.family.getLoginId());
    }

    snapshot() {
        if (this.family != undefined) {
            this.snapshotService.snapshot(this.family)
                .subscribe({
                    next: () => this.reload(),
                    error: (error: HttpErrorResponse) => this.registerError(error)
                });
        }
    }

    private registerFamily(family: Family) {
        this.family = family;
        this.familySubject.next(this.family);
    }

    private registerError(error: HttpErrorResponse) {
        this.errorSubject.next(error);
    }
}