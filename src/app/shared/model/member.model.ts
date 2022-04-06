import { Growth } from "./growth.model";
import { Investment } from "./investment.model";

export class Member {
    private investmentList: Array<Investment> = [];

    constructor(
        private id: number,
        private name: string,
        private growth: Growth,
    ) { }

}