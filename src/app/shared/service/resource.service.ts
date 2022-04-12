import { Injectable } from "@angular/core";
import { AssetTypeDto } from "../dto/asset-type-dto.model";
import { GetBackendResourceService } from "./backend/get-backend-resource.service";

@Injectable()
export class ResourceService {
    private goalTermList: Array<string>;
    private assetTypeList: Array<AssetTypeDto>;

    constructor(private getResource: GetBackendResourceService) { }

    init(): void {
        this.getResource.getAllGoalTerms()
            .subscribe(goalTerms => this.goalTermList = goalTerms);

        this.getResource.getAllAssetTypes()
            .subscribe(assetTypes => this.assetTypeList = assetTypes);
    }

    getAllGoalTerms(): Array<string> {
        return this.goalTermList;
    }

    getAllAssetTypes(): Array<AssetTypeDto> {
        return this.assetTypeList;
    }
}