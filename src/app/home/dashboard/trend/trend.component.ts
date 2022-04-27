import { Component, Input, OnInit } from "@angular/core";
import { DatasetConfig, LineChartConfig } from "src/app/charts/line-chart/line-chart.component";
import { Utilities } from "src/app/shared/util";
import { SeriesDetail, TrendDetails } from "./trend-details.interface";

@Component({
    selector: 'app-trend',
    templateUrl: './trend.component.html'
})
export class TrendComponent<T> implements OnInit {
    @Input('details') details: TrendDetails<T>;
    chartConfig: LineChartConfig;

    ngOnInit(): void {
        const groupedData: Map<string, T> = this.groupByUnit();
        const labels = Utilities.toList(groupedData.keys()).reverse();

        this.chartConfig = {
            labels: labels,
            datasets: []
        }

        for (const seriesDetail of this.details.seriesDetails) {
            this.chartConfig.datasets.push(this.getDataset(labels, groupedData, seriesDetail));
        }
    }

    private groupByUnit(): Map<string, T> {
        const unitWiseData: Map<string, T> = new Map();
        for (const data of this.details.dataset) {
            const label = this.details.labelFunc(data);
            if (unitWiseData.has(label) === false) {
                unitWiseData.set(label, data);
            }
        }
        return unitWiseData;
    }

    private getDataset(labels: string[], groupedData: Map<string, T>, seriesDetail: SeriesDetail<T>): DatasetConfig {
        const values: number[] = [];
        for (const label of labels) {
            const data: T | undefined = groupedData.get(label);
            if (data !== undefined) {
                values.push(seriesDetail.valueFunc(data));
            }
        }
        return {
            series: seriesDetail.series,
            values: values
        };
    }

}