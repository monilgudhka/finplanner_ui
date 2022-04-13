import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { NewInvestmentDto } from "../dto/new-investment-dto.model";
import { UpdateGrowthDto } from "../dto/update-growth-dto.model";
import { Family } from "../model/family.model";
import { Investment } from "../model/investment.model";
import { CreateBackendResourceService } from "./backend/create-backend-resource.service";
import { UpdateBackendResourceService } from "./backend/update-backend-resource.service";
import { FamilyService } from "./family.service";

@Injectable()
export class InvestmentsService {

    private family: Family;
    private investmentsSubject: Subject<Array<Investment>> = new Subject();
    private errorSubject: Subject<HttpErrorResponse> = new Subject();
    private familySubscription: Subscription;
    private errorSubscription: Subscription;

    constructor(
        private createResource: CreateBackendResourceService,
        private updateResource: UpdateBackendResourceService,
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
    subscribeInvestments(next: (value: Array<Investment>) => void): Subscription {
        return this.investmentsSubject.subscribe(next);
    }

    subscribeError(next: (value: HttpErrorResponse) => void): Subscription {
        return this.errorSubject.subscribe(next);
    }

    getInvestments(): Array<Investment> {
        return (this.family) ? this.family.getAllInvestments().slice() : [];
    }

    getInvestment(id: number): Investment {
        return this.family.getInvestment(id);
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

    updateGrowth(investment: Investment, updateGrowthDto: UpdateGrowthDto) {
        this.updateResource
            .updateGrowth(investment, updateGrowthDto)
            .subscribe(() => this.familyService.reload());
    }
}