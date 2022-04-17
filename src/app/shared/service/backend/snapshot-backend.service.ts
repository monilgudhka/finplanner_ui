import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Family } from "../../model/family.model";

@Injectable()
export class SnapshotBackendService {

    constructor(private http: HttpClient) { }

    snapshot(family: Family): Observable<void> {
        return this.http.post<void>(
            'http://localhost:8080/api/family/' + family.getId() + '/snapshot/',
            {}
        );
    }
}