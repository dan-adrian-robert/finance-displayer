import {Category, Transaction} from "./types";
import moment from "moment";
import {TOKEN_LIST} from "./tokens";

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

export const stringToDate = (dateString: string) => {
    const [day,month,year] = dateString.split('/');
    const date =  moment([ year,  parseInt(month) - 1, day]);
    return date;
}

export const noSavingsTransactions = (item: Transaction) => {
    return item.targetName !== 'ADRIAN ROBERT DAN';
}

export const getDataPointsFromSpendList = (data: any) => {
    let list = data.split('\n');

    console.log('Rows: ', list.length);
    const allTransactions = list.map((item: string, index: number) => {
        return getTransactionFromRow(item);
    });
    console.log('All transactions: ', allTransactions.length);
    let validTransactions = allTransactions.filter(( item: any ) => {
        return item != null;
    });
    console.log('Valid transactions: ', validTransactions.length);

    validTransactions = validTransactions.filter(noSavingsTransactions);
    console.log('Valid noSavingsTransactions: ', validTransactions.length);
    return validTransactions;
}

export const getTransactionFromRow = (row: string): Transaction | null => {
    const fields: string[] = row.split(',');
    let transaction: any = {};
    // eslint-disable-next-line array-callback-return
    fields.map((fieldValue: string, index: number) => {
        const key = TRANSACTION_KEYS[index];
        transaction[key] = fieldValue;
    });

    const category: Category = getTransactionCategory(transaction);

    let result = transaction as Transaction;
    result.registrationDate = stringToDate(result.registrationDate);
    result.transactionDate = stringToDate(result.transactionDate);
    result.category = category;

    if (!result.registrationDate.isValid()) {
        return null;
    }

    return result;
}

export const getTransactionCategory = (transaction: any): Category => {
    for (let i = 0; i < TOKEN_LIST.length; i ++) {
        const item = TOKEN_LIST[i];
        if (!transaction.description) {
            return Category.OTHER;
        }
        const description = transaction.description;
        if (description.toLowerCase().includes(item.token.toLowerCase())) {
            return item.category;
        }
    }

    return Category.OTHER;
}