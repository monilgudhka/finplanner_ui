import { FamilyDto } from "../dto/family-dto.model";
import { GrowthDto } from "../dto/growth-dto.model";
import { InvestmentDto } from "../dto/investment-dto.model";
import { MemberDto } from "../dto/member-dto.model";
import { Family } from "../model/family.model";
import { Growth } from "../model/growth.model";
import { Investment } from "../model/investment.model";
import { Member } from "../model/member.model";

export class ConverterService {

    public static convert(familyDto: FamilyDto): Family {
        const family = new Family(familyDto.id, familyDto.login_id, ConverterService.toGrowth(familyDto.growth));

        if (familyDto.members) {
            const memberMap: Map<number, Member> = ConverterService.allMembers(family, familyDto.members);

            if (familyDto.investments) {
                ConverterService.allInvestments(family, memberMap, familyDto.investments);
            }
        }

        return family;
    }

    private static allMembers(family: Family, members: MemberDto[]): Map<number, Member> {
        const memberMap: Map<number, Member> = new Map();
        for (let memberDto of members) {
            const member = ConverterService.toMember(memberDto);
            memberMap.set(member.getId(), member);
            family.addMember(member);
        }
        return memberMap;
    }

    private static allInvestments(family: Family, memberMap: Map<number, Member>, investments: InvestmentDto[]) {
        for (let investmentDto of investments) {
            const member: Member | undefined = memberMap.get(investmentDto.member_id);
            if (member == undefined) {
                continue;
            }
            const investment = ConverterService.toInvestment(investmentDto, member);
            member.addInvestment(investment);
            family.addInvestment(investment);
        }
    }

    private static toMember(memberDto: MemberDto): Member {
        return new Member(
            memberDto.id,
            memberDto.name,
            ConverterService.toGrowth(memberDto.growth)
        );
    }

    private static toInvestment(investmentDto: InvestmentDto, member: Member): Investment {
        return new Investment(
            investmentDto.id,
            investmentDto.title,
            investmentDto.asset_type,
            investmentDto.asset_class,
            investmentDto.liquidity,
            investmentDto.goal_term,
            member,
            ConverterService.toGrowth(investmentDto.growth)
        );
    }

    private static toGrowth(growthDto: GrowthDto): Growth {
        return new Growth(
            growthDto.id,
            growthDto.invested_amount,
            growthDto.current_amount,
            growthDto.rate_of_return,
            new Date(growthDto.last_updated)
        );
    }
}