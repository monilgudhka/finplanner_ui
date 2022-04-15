export class Utilities {

    public static round(value: number, decimal: number = 2): number {
        return parseFloat(((value * 100) / 100).toFixed(decimal));
    }

}