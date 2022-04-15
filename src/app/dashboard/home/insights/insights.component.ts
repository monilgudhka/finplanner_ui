import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html'
})
export class InsightsComponent<T> implements OnInit {
  @Input('elements') elements: Array<T>;
  @Input('categoryFunc') categoryFunc: (element: T) => string;
  @Input('valueFunc') valueFunc: (element: T) => number;
  labels: string[] = [];
  values: number[] = [];

  constructor() { }

  ngOnInit(): void {
    let totalValue: number = 0;
    const labelToValueMap: Map<string, number> = new Map();
    for (const element of this.elements) {
      const label: string = this.categoryFunc(element);
      let value: number = this.valueFunc(element);
      totalValue = totalValue + value;

      const previousValue: number | undefined = labelToValueMap.get(label);
      if (previousValue != undefined) {
        value = value + previousValue;
      }
      labelToValueMap.set(label, value);
    }

    for (const [key, value] of labelToValueMap.entries()) {
      this.labels.push(key + '(' + value + ')');
      this.values.push((value / totalValue) * 100);
    }
  }

  onClick(label: string) {
    console.log(label, 'clicked');
  }
}
