export interface SeriesDetail<T> {
    series: string,
    valueFunc: (data: T) => number
}

export interface TrendDetails<T> {
    title: string,
    dataset: T[],
    labelFunc: (data: T) => string,
    seriesDetails: SeriesDetail<T>[]
}