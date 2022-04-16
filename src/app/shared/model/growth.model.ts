import { Utilities } from "../util";

export class Growth {
    private absoluteReturns: number;
    private absoluteReturnsPercentage: number;

    constructor(
        private id: number,
        private investedAmount: number,
        private currentAmount: number,
        private rateOfReturn: number,
        private lastUpdated: Date,
    ) {
        this.absoluteReturns = Utilities.round(this.currentAmount - this.investedAmount);
        this.absoluteReturnsPercentage = Utilities.round(((this.currentAmount / this.investedAmount) - 1) * 100);
    }

    getId(): number {
        return this.id;
    }

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
        return this.absoluteReturns;
    }

    getAbsoluteReturnsPercentage(): number {
        return this.absoluteReturnsPercentage;
    }

    setInvestmentAmount(amount: number) {
        this.investedAmount = amount;
    }

    setCurrentAmount(amount: number) {
        this.currentAmount = amount;
    }
}