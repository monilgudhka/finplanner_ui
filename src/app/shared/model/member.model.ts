import { Growth } from "./growth.model";
import { Investment } from "./investment.model";

export class Member {
    private id: number;
    private name: string;
    private growth: Growth;
    private investmentList: Array<Investment>;
}