import { Injectable } from "@angular/core";
import { from, map, mergeMap, Observable } from "rxjs";
import { Family } from "../model/family.model";
import { Member } from "../model/member.model";
import { NewInvestmentDto } from "../dto/new-investment-dto.model";
import { Investment } from "../model/investment.model";
import { UpdateGrowthDto } from "../dto/update-growth-dto.model";
import { CreateResourceBackendService } from "./backend/create-resource-backend.service";
import { GetResourceBackendService } from "./backend/get-resource-backend.service";
import { UpdateResourceBackendService } from "./backend/update-resource-backend.service";

@Injectable()
export class FamilyService {

    private family: Family;

    constructor(
        private createResource: CreateResourceBackendService,
        private getResource: GetResourceBackendService,
        private updateResource: UpdateResourceBackendService
    ) { }

    loadDetails(loginId: string): Observable<boolean> {
        if (loginId === '') {
            return from([false]);
        } else if (this.family && loginId === this.family.getLoginId()) {
            return from([true]);
        } else {
            return this.getResource.getFamily(loginId)
                .pipe(map((family) => {
                    this.family = family;
                    return true;
                }));
        }
    }

    getFamily(): Family {
        return this.family;
    }

    createMember(name: string) {
        this.createResource
            .createMember(this.family.getId(), name)
            .subscribe(member => {
                this.family.addMember(member);
            });
    }

    createInvestment(memberId: number, newInvestmentDto: NewInvestmentDto) {
        const member: Member = this.family.getMember(memberId);
        this.createResource
            .createInvestment(member, newInvestmentDto)
            .subscribe(investment => {
                this.family.addInvestment(investment);
            });
    }

    updateGrowth(investment: Investment, updateGrowthDto: UpdateGrowthDto) {
        this.updateResource
            .updateGrowth(investment, updateGrowthDto)
            .pipe(mergeMap(() => {
                return this.getResource.getFamily(this.family.getLoginId());
            }))
            .subscribe(family => {
                this.family = family;
            })
    }
}