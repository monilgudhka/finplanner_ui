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
export class HistoricStatsSummaryComponent implements OnInit {
    @Input('config') config: HistoricStatsConfig;
    netWorthChange: number = 0;
    returnsChange: number = 0;
    averageNetWorth: number = 0;
    averageReturns: number = 0;

    ngOnInit(): void {
        const groupedData: Map<string, Growth> = this.groupByUnit();

        const netWorthChanges: number[] = this.calculateChanges(groupedData, g => g.getCurrentAmount());
        this.averageNetWorth = Utilities.average(netWorthChanges);
        this.netWorthChange = Utilities.getFirst(netWorthChanges, 0);

        const returnsChanges: number[] = this.calculateChanges(groupedData, g => g.getAbsoluteReturns());
        this.averageReturns = Utilities.average(returnsChanges);
        this.returnsChange = Utilities.getFirst(returnsChanges, 0);
    }

    private groupByUnit(): Map<string, Growth> {
        const unitWiseData: Map<string, Growth> = new Map();
        for (const growth of this.config.data) {
            const date = growth.getLastUpdatedDate();
            const dateStr = this.config.groupingFunc(date);
            if (unitWiseData.has(dateStr) === false) {
                unitWiseData.set(dateStr, growth);
            }
        }
        return unitWiseData;
    }

    private calculateChanges(groupedData: Map<string, Growth>, valueFunc: (growth: Growth) => number): number[] {
        const changeHistory: Array<number> = [];
        let futureValue: number | undefined;
        for (const growth of groupedData.values()) {
            const value = valueFunc(growth);
            if (futureValue !== undefined) {
                changeHistory.push(Utilities.round(futureValue - value));
            }
            futureValue = value;
        }
        return changeHistory;
    }

}