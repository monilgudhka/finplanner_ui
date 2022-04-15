export interface InsightDetails<T> {
    title: string,
    elements: Array<T>,
    categoryFunc: (element: T) => string,
    valueFunc: (element: T) => number,
}