import {Transaction} from "./types";

const TRANSACTION_KEYS = [
    'registrationDate',
    'transactionDate',
    'debit',
    'credit',
    'numOP',
    'fiscalCode',
    'ordination',
    'finalBenefactor',
    'targetName',
    'bankName',
    'accNumber',
    'description',
];
//The start index of the transaction List;
const TRANSACTION_INDEX = 20;

export const getDataPointsFromSpendList = (data: any) => {
    let list = data.split('\n');
    list = list.splice(TRANSACTION_INDEX, list.length);

    return list.map((item: string, index: number) => {
        const transaction = getTransactionFromRow(item);
        console.log(index, transaction.registrationDate);
        return transaction;
    });
}

export const getTransactionFromRow = (row: string): Transaction => {
    const fields: string[] = row.split(',');
    let transaction: any = {};
    // eslint-disable-next-line array-callback-return
    fields.map((fieldValue: string, index: number) => {
        const key = TRANSACTION_KEYS[index];
        transaction[key] = fieldValue;
    });
    let result = transaction as Transaction;

    result.registrationDate = new Date(result.registrationDate);
    result.transactionDate = new Date(result.transactionDate);
    return result;
}