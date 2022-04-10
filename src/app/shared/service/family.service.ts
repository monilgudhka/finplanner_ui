import { Injectable } from "@angular/core";
import { from, map, Observable } from "rxjs";
import { Family } from "../model/family.model";
import { Growth } from "../model/growth.model";
import { Investment } from "../model/investment.model";
import { Member } from "../model/member.model";
import { NewInvestment } from "../model/new-investment.model";
import { BackendService } from "./backend.service";

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
        // TODO: Call backend to add member
        const member: Member = new Member(4, name, new Growth(4, 0, 0, 0, new Date()));
        this.family.addMember(member);
    }

    createInvestment(memberId: number, newInvestment: NewInvestment) {
        // TODO: Call backend to add investment
        const member: Member = this.family.getMember(memberId);
        const investment: Investment = new Investment(5, newInvestment.title, newInvestment.assetType, 'EQUITY', 'LIQUID', newInvestment.goalTerm, member, new Growth(5, 0, 0, 0, new Date()));
        this.family.addInvestment(investment);
    }

    updateGrowth(growth: Growth) {
        // TODO: Call backend to update Growth
    }
}