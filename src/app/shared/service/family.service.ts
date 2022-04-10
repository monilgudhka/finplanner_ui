import { Injectable } from "@angular/core";
import { from, map, mergeMap, Observable } from "rxjs";
import { Family } from "../model/family.model";
import { Growth } from "../model/growth.model";
import { Member } from "../model/member.model";
import { NewInvestmentDto } from "../dto/new-investment-dto.model";
import { BackendService } from "./backend.service";
import { Investment } from "../model/investment.model";
import { UpdateGrowthDto } from "../dto/update-growth-dto.model";

@Injectable()
export class FamilyService {

    private family: Family;

    constructor(private backendService: BackendService) { }

    loadDetails(loginId: string): Observable<boolean> {
        if (loginId === '') {
            return from([false]);
        } else if (this.family && loginId === this.family.getLoginId()) {
            return from([true]);
        } else {
            return this.backendService.getFamily(loginId)
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
        this.backendService
            .createMember(this.family.getId(), name)
            .subscribe(member => {
                this.family.addMember(member);
            });
    }

    createInvestment(memberId: number, newInvestmentDto: NewInvestmentDto) {
        const member: Member = this.family.getMember(memberId);
        this.backendService
            .createInvestment(member, newInvestmentDto)
            .subscribe(investment => {
                this.family.addInvestment(investment);
            });
    }

    updateGrowth(investment: Investment, updateGrowthDto: UpdateGrowthDto) {
        this.backendService
            .updateGrowth(investment, updateGrowthDto)
            .pipe(mergeMap(investment => {
                return this.backendService.getFamily(this.family.getLoginId());
            }))
            .subscribe(family => {
                this.family = family;
            })
    }
}