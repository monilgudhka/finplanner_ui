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
}