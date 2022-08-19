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
const TRANSACTION_INDEX_START = 21;
const TRANSACTION_INDEX_END = 790;

export const stringToDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
}

export const getDataPointsFromSpendList = (data: any) => {
    let list = data.split('\n');
    list = list.splice(TRANSACTION_INDEX_START, TRANSACTION_INDEX_END - TRANSACTION_INDEX_START);
    console.log(list);
    return list.map((item: string, index: number) => {
        return getTransactionFromRow(item);
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

    result.registrationDate = stringToDate(result.registrationDate);
    result.transactionDate = stringToDate(result.transactionDate);
    return result;
}