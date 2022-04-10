import { Injectable } from "@angular/core";
import { from, map, Observable } from "rxjs";
import { Family } from "../model/family.model";
import { Growth } from "../model/growth.model";
import { Member } from "../model/member.model";
import { NewInvestmentDto } from "../dto/new-investment-dto.model";
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
        this.backendService
            .createMember(this.family.getId(), name)
            .subscribe(this.family.addMember);
    }

    createInvestment(memberId: number, newInvestmentDto: NewInvestmentDto) {
        const member: Member = this.family.getMember(memberId);
        this.backendService
            .createInvestment(member, newInvestmentDto)
            .subscribe(this.family.addInvestment);
    }

    updateGrowth(growth: Growth) {
        // TODO: Call backend to update Growth
    }
}