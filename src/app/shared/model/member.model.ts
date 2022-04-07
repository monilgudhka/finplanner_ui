import { Growth } from "./growth.model";
import { Investment } from "./investment.model";

export class Member {
    private investmentList: Array<Investment> = [];

    constructor(
        private id: number,
        private name: string,
        private growth: Growth,
    ) { }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    addInvestment(investment: Investment) {
        this.investmentList.push(investment);
    }

    getGrowth(): Growth {
        return this.growth;
    }
}