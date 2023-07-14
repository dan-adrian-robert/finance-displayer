import {Transaction} from "../types";

export const getTotalSpendAmount = (transactionList: Transaction[]): number => {
    let result: number = 0;

    transactionList.map((transaction: Transaction, transactionIndex) => {
        if (transaction.targetName === 'ADRIAN ROBERT DAN') {
            return;
        }

        result += transaction.debit || 0;
        result = Math.floor(result * 100) / 100;
        return null;
    });

    return result;
}

export const getTotalGainedAmount = (transactionList: Transaction[]): number => {
    let result: number = 0;

    transactionList.map((transaction: Transaction) => {
        result += transaction.credit || 0;
        return null;
    });

    return result;
}

