import { Family } from "../model/family.model";
import { Growth } from "../model/growth.model";

export class FamilyService {

    private family: Family | undefined;
    private loginId: string = '';

    loadDetails(loginId: string): boolean {
        if (loginId === this.loginId) {
            return true;
        } else if (loginId === 'family_a') {
            this.loadMockData();
            this.loginId = loginId;
            return true;
        } else {
            return false;
        }
    }

    getFamily(): Family | undefined {
        return this.family;
    }

    private loadMockData() {
        this.family = new Family(1, 'family_a', new Growth(1, 0, 0.0, 0.0, new Date()));
    }
}