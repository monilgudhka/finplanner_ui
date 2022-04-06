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
}