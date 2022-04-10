import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FamilyDto } from "../dto/family-dto.model";
import { Family } from "../model/family.model";
import { ConverterService } from "./converter.service";

@Injectable()
export class BackendService {

    constructor(private http: HttpClient) { }

    createFamily(loginId: string): Observable<Family> {
        return this.http.post<FamilyDto>(
            'http://localhost:8080/api/family', {},
            { params: { login_id: loginId } }
        ).pipe(map(ConverterService.convert));
    }

}