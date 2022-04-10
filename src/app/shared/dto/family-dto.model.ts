import { GrowthDto } from "./growth-dto.model";
import { InvestmentDto } from "./investment-dto.model";
import { MemberDto } from "./member-dto.model";

export interface FamilyDto {
    id: number,
    login_id: string,
    growth: GrowthDto,
    members?: MemberDto[],
    investments?: InvestmentDto[]
}