import { Component, Input, OnInit } from "@angular/core";
import { ChartConfiguration, ChartType } from "chart.js";

export interface DatasetConfig {
    series: string,
    values: number[]
}

export interface LineChartConfig {
    labels: string[];
    datasets: DatasetConfig[]
}

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnInit {
    @Input('config') lineChartConfig: LineChartConfig;

    chartOptions: ChartConfiguration['options'] = {
        elements: {
            line: { tension: 0.5 }
        },
        scales: {
            x: {},
            'y-axis-0': { position: 'left' }
        },
        plugins: {
            legend: { display: true }
        }
    };
    chartType: ChartType = 'line';
    chartData: ChartConfiguration['data'];

    ngOnInit(): void {
        this.chartData = {
            labels: this.lineChartConfig.labels,
            datasets: []
        };

        for (const data of this.lineChartConfig.datasets) {
            this.chartData.datasets.push({
                data: data.values,
                label: data.series,
                fill: 'origin',
            });
        }
    }

}