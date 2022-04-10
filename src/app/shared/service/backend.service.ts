import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { flatMap, map, mergeMap, Observable } from "rxjs";
import { FamilyDto } from "../dto/family-dto.model";
import { InvestmentDto } from "../dto/investment-dto.model";
import { MemberDto } from "../dto/member-dto.model";
import { Family } from "../model/family.model";
import { Investment } from "../model/investment.model";
import { Member } from "../model/member.model";
import { NewInvestmentDto } from "../dto/new-investment-dto.model";
import { ConverterService } from "./converter.service";
import { UpdateGrowthDto } from "../dto/update-growth-dto.model";

@Injectable()
export class BackendService {

    constructor(private http: HttpClient) { }

    createFamily(loginId: string): Observable<Family> {
        return this.http.post<FamilyDto>(
            'http://localhost:8080/api/family', {},
            { params: { login_id: loginId } }
        ).pipe(map(ConverterService.convert));
    }

    getFamily(loginId: string): Observable<Family> {
        return this.http.get<FamilyDto>(
            'http://localhost:8080/api/family',
            { params: { login_id: loginId } }
        ).pipe(map(ConverterService.convert));
    }

    createMember(familyId: number, name: string): Observable<Member> {
        return this.http.post<MemberDto>(
            'http://localhost:8080/api/family/' + familyId + '/member',
            {},
            { params: { name: name } }
        ).pipe(map(ConverterService.toMember));
    }

    createInvestment(member: Member, newInvestmentDto: NewInvestmentDto): Observable<Investment> {
        return this.http.post<InvestmentDto>(
            'http://localhost:8080/api/member/' + member.getId() + '/investment',
            newInvestmentDto
        ).pipe(map(investmentDto => {
            return ConverterService.toInvestment(investmentDto, member);
        }));
    }

    updateGrowth(investment: Investment, updateGrowth: UpdateGrowthDto): Observable<Investment> {
        return this.http.put<InvestmentDto>(
            'http://localhost:8080/api/investment/' + investment.getId(),
            updateGrowth
        ).pipe(map(investmentDto => {
            return ConverterService.toInvestment(investmentDto, investment.getMember());
        }));
    }

}