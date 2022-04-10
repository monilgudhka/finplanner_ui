import { Growth } from "./growth.model";
import { Investment } from "./investment.model";
import { Member } from "./member.model";

export class Family {
    private investmentList: Array<Investment> = [];
    private memberList: Array<Member> = [];

    constructor(
        private id: number,
        private loginId: string,
        private growth: Growth,
    ) { }

    getId(): number {
        return this.id;
    }

    getLoginId(): string {
        return this.loginId;
    }

    getGrowth(): Growth {
        return this.growth;
    }

    addMember(member: Member) {
        this.memberList.push(member);
    }

    addInvestment(investment: Investment) {
        this.investmentList.push(investment);
    }

    getAllMembers(): Array<Member> {
        return this.memberList;
    }

    getAllInvestments(): Array<Investment> {
        return this.investmentList;
    }

    getMember(id: number): Member {
        return this.memberList.filter(m => m.getId() === id)[0];
    }

    getInvestment(id: number): Investment {
        return this.investmentList.filter(iv => iv.getId() === id)[0];
    }
}