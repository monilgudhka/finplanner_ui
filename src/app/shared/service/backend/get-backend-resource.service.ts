import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AssetTypeDto } from "../../dto/asset-type-dto.model";
import { FamilyDto } from "../../dto/family-dto.model";
import { GrowthDto } from "../../dto/growth-dto.model";
import { Family } from "../../model/family.model";
import { Growth } from "../../model/growth.model";
import { ConverterService } from "../converter.service";

@Injectable()
export class GetBackendResourceService {
    constructor(private http: HttpClient) { }

    getFamily(loginId: string): Observable<Family> {
        return this.http.get<FamilyDto>(
            'http://localhost:8080/api/family',
            { params: { login_id: loginId } }
        ).pipe(map(ConverterService.convert));
    }

    getAllGoalTerms(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:8080/api/goal-terms');
    }

    getAllAssetTypes(): Observable<AssetTypeDto[]> {
        return this.http.get<AssetTypeDto[]>('http://localhost:8080/api/asset-types');
    }

    getGrowthHistory(id: number): Observable<Array<Growth>> {
        return this.http.get<Array<GrowthDto>>('http://localhost:8080/api/growth/' + id + '/history')
            .pipe(map((history: Array<GrowthDto>) => {
                return history.map(ConverterService.toGrowth);
            }));
    }

}