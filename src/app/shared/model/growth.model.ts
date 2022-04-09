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

    getLastUpdated(): string {
        return this.lastUpdated.toDateString();
    }

    getAbsoluteReturns(): number {
        return this.currentAmount - this.investedAmount;
    }

    getAbsoluteReturnsPercentage(): number {
        return Math.floor(((this.currentAmount / this.investedAmount) - 1) * 100);
    }

    setInvestmentAmount(amount: number) {
        this.investedAmount = amount;
    }

    setCurrentAmount(amount: number) {
        this.currentAmount = amount;
    }
}