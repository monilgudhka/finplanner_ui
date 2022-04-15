import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InsightDetails } from './insight-details.interface';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html'
})
export class InsightsComponent<T> implements OnInit {

  @Output('checkDetails') checkDetails: EventEmitter<string> = new EventEmitter();
  @Input('insight') insight: InsightDetails<T>;

  labels: string[] = [];
  values: number[] = [];

  constructor(private currency: CurrencyPipe) { }

  ngOnInit(): void {
    let totalValue: number = 0;
    const labelToValueMap: Map<string, number> = new Map();
    for (const element of this.insight.elements) {
      if (this.insight.filterFunc !== undefined && !this.insight.filterFunc(element)) {
        continue;
      }

      const label: string = this.insight.categoryFunc(element);
      let value: number = this.insight.valueFunc(element);
      totalValue = totalValue + value;

      const previousValue: number | undefined = labelToValueMap.get(label);
      if (previousValue != undefined) {
        value = value + previousValue;
      }
      labelToValueMap.set(label, value);
    }

    for (const [key, value] of labelToValueMap.entries()) {
      this.labels.push(key + '(' + this.currency.transform(value, 'INR') + ')');
      this.values.push((value / totalValue) * 100);
    }
  }

  onClick(label: string) {
    const endIndex = label.indexOf('(');
    const category = label.substring(0, endIndex).trim();
    this.checkDetails.emit(category);
  }
}
