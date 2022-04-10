import { GrowthDto } from "./growth-dto.model";

export interface InvestmentDto {
    id: number,
    title: string,
    asset_type: string,
    asset_class: string,
    liquidity: string,
    goal_term: string,
    member_id: number,
    growth: GrowthDto
}