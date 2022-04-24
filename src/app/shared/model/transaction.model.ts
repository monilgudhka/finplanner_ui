export class Transaction {
    constructor(
        private id: number,
        private timestamp: Date,
        private amount: number,
        private description: string,
        private transactionType: string,
    ) { }
}