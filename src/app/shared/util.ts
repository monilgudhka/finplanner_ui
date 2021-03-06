import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

export class Utilities {

    public static round(value: number, decimal: number = 2): number {
        return parseFloat(((value * 100) / 100).toFixed(decimal));
    }

    public static average(values: number[]): number {
        const sum = values.reduce((p, c) => p + c, 0);
        return Utilities.round(sum / values.length);
    }

    public static getFirst<T>(values: T[], d: T): T {
        return (values.length > 0) ? values[0] : d;
    }

    public static toList<T>(iterator: IterableIterator<T>): T[] {
        const values: T[] = [];
        for (const value of iterator) {
            values.push(value);
        }
        return values;
    }

    public static displaySnackBar(snackBar: MatSnackBar, error: HttpErrorResponse) {
        let message = error.message;
        if (typeof (error.error) === 'string') {
            message = <string>error.error;
        }

        snackBar.open(message, 'Dismiss', {
            duration: 5000
        });
    }

}