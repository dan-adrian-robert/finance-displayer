import {Transaction} from "../types";

export const getTotalSpendAmount = (transactionList: Transaction[]): number => {
    let result: number = 0;

    transactionList.map((transaction: Transaction) => {
        result += Number.parseInt(transaction.debit || 0);
        return null;
    });

    return result;
}

export const getTotalGainedAmount = (transactionList: Transaction[]): number => {
    let result: number = 0;

    transactionList.map((transaction: Transaction) => {
        result += Number.parseInt(transaction.credit || 0);
        return null;
    });

    return result;
}

