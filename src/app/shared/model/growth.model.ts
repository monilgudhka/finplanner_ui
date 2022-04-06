export class Growth {
    constructor(
        private id: number,
        private investedAmount: number,
        private currentAmount: number,
        private rateOfReturn: number,
        private lastUpdated: Date,
    ) { }
}