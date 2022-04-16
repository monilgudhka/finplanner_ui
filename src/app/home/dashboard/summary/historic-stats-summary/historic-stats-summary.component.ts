import { Component, Input, OnInit } from "@angular/core";
import { Growth } from "src/app/shared/model/growth.model";
import { Utilities } from "src/app/shared/util";

export interface HistoricStatsConfig {
    data: Growth[],
    title: string,
    subtitle: string,
    groupingFunc: (date: Date) => string
}

@Component({
    selector: 'app-historic-stats-summary',
    templateUrl: './historic-stats-summary.component.html'
})
export class HistoricStatsSummary implements OnInit {
    @Input('config') config: HistoricStatsConfig;
    changeAmount: number = 0;
    averageChange: number = 0;

    ngOnInit(): void {
        const unitWiseData: Map<string, number> = this.groupByUnit();
        const changeHistory: Array<number> = this.calculateChange(unitWiseData);
        this.calculateAverage(changeHistory);
    }

    private groupByUnit(): Map<string, number> {
        const unitWiseData: Map<string, number> = new Map();
        for (const growth of this.config.data) {
            const date = growth.getLastUpdatedDate();
            const dateStr = this.config.groupingFunc(date);
            if (unitWiseData.has(dateStr) === false) {
                unitWiseData.set(dateStr, growth.getCurrentAmount());
            }
        }
        return unitWiseData;
    }

    private calculateChange(unitWiseData: Map<string, number>): number[] {
        const changeHistory: Array<number> = [];
        let futureValue: number | undefined;
        for (const value of unitWiseData.values()) {
            if (futureValue !== undefined) {
                changeHistory.push(Utilities.round(futureValue - value));
            }
            futureValue = value;
        }
        return changeHistory;
    }

    private calculateAverage(changeHistory: number[]) {
        const sum: number = changeHistory.reduce((p, c) => p + c, 0);
        this.averageChange = Utilities.round(sum / changeHistory.length);
    }

}