import { Family } from "../model/family.model";
import { Growth } from "../model/growth.model";
import { Investment } from "../model/investment.model";
import { Member } from "../model/member.model";

export class FamilyService {

    private family: Family | undefined;
    private loginId: string = '';

    loadDetails(loginId: string): boolean {
        if (loginId === this.loginId) {
            return true;
        } else if (loginId === 'family_a') {
            this.loadMockData();
            this.loginId = loginId;
            return true;
        } else {
            return false;
        }
    }

    getFamily(): Family | undefined {
        return this.family;
    }

    private loadMockData() {
        const data = { "id": 1, "login_id": "family_a", "members": [{ "id": 1, "name": "member_a", "growth": { "id": 2, "invested_amount": 100, "current_amount": 200, "rate_of_return": 100, "last_updated": "2022-04-01" } }, { "id": 2, "name": "member_b", "growth": { "id": 3, "invested_amount": 500, "current_amount": 600, "rate_of_return": 10, "last_updated": "2022-04-07" } }], "investments": [{ "id": 1, "title": "investment_a", "asset_type": "MID_CAP", "asset_class": "EQUITY", "liquidity": "LIQUID", "goal_term": "MID_TERM", "member_id": 1, "growth": { "id": 4, "invested_amount": 100, "current_amount": 200, "rate_of_return": 100, "last_updated": "2022-04-01" } }, { "id": 2, "title": "investment_b", "asset_type": "MID_CAP", "asset_class": "EQUITY", "liquidity": "NON_LIQUID", "goal_term": "MID_TERM", "member_id": 2, "growth": { "id": 5, "invested_amount": 500, "current_amount": 600, "rate_of_return": 10, "last_updated": "2022-04-07" } }], "growth": { "id": 1, "invested_amount": 600, "current_amount": 800, "rate_of_return": 20, "last_updated": "2022-04-07" } };
        this.family = new Family(data['id'], data['login_id'], this.toGrowth(data['growth']));

        const memberMap: Map<number, Member> = new Map();
        for (let memberData of data['members']) {
            const member = new Member(memberData['id'], memberData['name'], this.toGrowth(memberData['growth']));
            memberMap.set(member.getId(), member);
            this.family.addMember(member);
        }

        for (let investmentData of data['investments']) {
            const member: Member | undefined = memberMap.get(investmentData['member_id']);
            if (member == undefined) {
                continue;
            }
            const investment = new Investment(
                investmentData['id'],
                investmentData['title'],
                investmentData['asset_type'],
                investmentData['asset_class'],
                investmentData['liquidity'],
                investmentData['goal_term'],
                member,
                this.toGrowth(investmentData['growth'])
            );
            member.addInvestment(investment);
            this.family.addInvestment(investment);
        }
    }

    private toGrowth(data: any): Growth {
        return new Growth(
            data['id'],
            data['invested_amount'],
            data['current_amount'],
            data['rate_of_return'],
            new Date(data['last_updated'])
        );
    }
}