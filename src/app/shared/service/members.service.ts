import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Family } from "../model/family.model";
import { Member } from "../model/member.model";
import { CreateBackendResourceService } from "./backend/create-backend-resource.service";
import { Family2Service } from "./family2.service";

@Injectable()
export class MembersService {

    private family: Family;
    private membersSubject: Subject<Array<Member>> = new Subject();
    private errorSubject: Subject<HttpErrorResponse> = new Subject();

    constructor(
        private createResource: CreateBackendResourceService,
        familyService: Family2Service
    ) {
        familyService.subscribeError(error => this.registerError(error));
        familyService.subscribeFamily(family => this.registerFamily(family));
    }

    // subscribe methods
    subscribeMembers(next: (value: Array<Member>) => void): Subscription {
        return this.membersSubject.subscribe(next);
    }

    subscribeError(next: (value: HttpErrorResponse) => void): Subscription {
        return this.errorSubject.subscribe(next);
    }

    getMembers(): Array<Member> {
        return (this.family) ? this.family.getAllMembers().slice() : [];
    }

    create(name: string) {
        this.createResource
            .createMember(this.family.getId(), name)
            .subscribe({
                next: (member: Member) => this.registerMember(member),
                error: (error: HttpErrorResponse) => this.registerError(error)
            });
    }

    private registerFamily(family: Family) {
        this.family = family;
        this.membersSubject.next(this.family.getAllMembers().slice());
    }

    private registerMember(member: Member) {
        this.family.addMember(member);
        this.membersSubject.next(this.family.getAllMembers().slice());
    }

    private registerError(error: HttpErrorResponse) {
        this.errorSubject.next(error);
    }
}