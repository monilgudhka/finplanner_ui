import { Growth } from "./growth.model";
import { Member } from "./member.model";

export class Investment {
    constructor(
        private id: number,
        private title: string,
        private assetType: string,
        private assetClass: string,
        private liquidity: string,
        private goalTerm: string,
        private member: Member,
        private growth: Growth,
    ) { }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getAssetType(): string {
        return this.assetType;
    }

    getAssetClass(): string {
        return this.assetClass;
    }

    getLiquidity(): string {
        return this.liquidity;
    }

    getGoalTerm(): string {
        return this.goalTerm;
    }

    getMember(): Member {
        return this.member;
    }

    getGrowth(): Growth {
        return this.growth;
    }
}