import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { NewInvestmentDto } from "../dto/new-investment-dto.model";
import { Family } from "../model/family.model";
import { Investment } from "../model/investment.model";
import { CreateBackendResourceService } from "./backend/create-backend-resource.service";
import { Family2Service } from "./family2.service";

@Injectable()
export class InvestmentsService {

    private family: Family;
    private investmentsSubject: Subject<Array<Investment>> = new Subject();
    private errorSubject: Subject<HttpErrorResponse> = new Subject();

    constructor(
        private createResource: CreateBackendResourceService,
        familyService: Family2Service
    ) {
        familyService.subscribeError(error => this.registerError(error));
        familyService.subscribeFamily(family => this.registerFamily(family));
    }

    // subscribe methods
    subscribeInvestments(next: (value: Array<Investment>) => void): Subscription {
        return this.investmentsSubject.subscribe(next);
    }

    subscribeError(next: (value: HttpErrorResponse) => void): Subscription {
        return this.errorSubject.subscribe(next);
    }

    create(newInvestmentDto: NewInvestmentDto) {
        this.createResource
            .createInvestment(this.family.getMember(newInvestmentDto.member_id), newInvestmentDto)
            .subscribe({
                next: (investment: Investment) => this.registerInvestment(investment),
                error: (error: HttpErrorResponse) => this.registerError(error)
            });
    }

    private registerFamily(family: Family) {
        this.family = family;
        this.investmentsSubject.next(this.family.getAllInvestments().slice());
    }

    private registerInvestment(investment: Investment) {
        this.family.addInvestment(investment);
        this.investmentsSubject.next(this.family.getAllInvestments().slice());
    }

    private registerError(error: HttpErrorResponse) {
        this.errorSubject.next(error);
    }
}