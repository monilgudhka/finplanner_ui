import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FamilyDto } from "../../dto/family-dto.model";
import { Family } from "../../model/family.model";
import { ConverterService } from "../converter.service";

@Injectable()
export class GetResourceBackendService {
    constructor(private http: HttpClient) { }

    getFamily(loginId: string): Observable<Family> {
        return this.http.get<FamilyDto>(
            'http://localhost:8080/api/family',
            { params: { login_id: loginId } }
        ).pipe(map(ConverterService.convert));
    }

}