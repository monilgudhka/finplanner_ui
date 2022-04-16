import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UpdateGrowthDto } from "../../dto/update-growth-dto.model";
import { Investment } from "../../model/investment.model";

@Injectable()
export class UpdateBackendResourceService {
    constructor(private http: HttpClient) { }

    updateGrowth(investment: Investment, updateGrowth: UpdateGrowthDto): Observable<void> {
        return this.http.put<void>(
            'http://localhost:8080/api/growth/investment/' + investment.getId(),
            updateGrowth
        );
    }

}