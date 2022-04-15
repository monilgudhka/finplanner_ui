import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html'
})
export class DoughnutChartComponent implements OnInit {
  @Output('chartClicked') chartClicked = new EventEmitter<string>();
  @Input('labels') labels: string[];
  @Input('values') values: number[];

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  chartType: ChartType = 'doughnut';
  chartData: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.chartData = {

      labels: this.labels,
      datasets: [
        { data: this.values }
      ]
    };
  }

  // events
  onChartClick({ event, active }: { event?: ChartEvent | undefined; active?: {}[] | undefined; }): void {
    if (active && active.length > 0) {
      const element: { index?: number } = active[0];
      if (element.index != undefined) {
        this.chartClicked.emit(this.labels[element.index]);
      }
    }
  }

}
