import { GrowthDto } from "./growth-dto.model";

export interface MemberDto {
    id: number,
    name: string,
    growth: GrowthDto
}