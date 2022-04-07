export class Growth {
    constructor(
        private id: number,
        private investedAmount: number,
        private currentAmount: number,
        private rateOfReturn: number,
        private lastUpdated: Date,
    ) { }

    getInvestmentAmount(): number {
        return this.investedAmount;
    }

    getCurrentAmount(): number {
        return this.currentAmount;
    }

    getRateOfReturn(): number {
        return this.rateOfReturn;
    }

    getLastUpdated(): Date {
        return this.lastUpdated;
    }
}