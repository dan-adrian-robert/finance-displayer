import {Category, Transaction} from "./types";
import moment from "moment";
import {TOKEN_LIST} from "./tokens";
import {MONTHS} from "./components/SpendByCategory";

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
    // const date =  moment([ year,  parseInt(month) - 1, day]);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).getTime();
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

    if (isNaN(result.registrationDate)) {
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

export const getTransactionInMonth = (yearTransactionList: Transaction[], month: number): Transaction[] => {
    return yearTransactionList.filter((transaction: Transaction) => {
        const date = moment(transaction.registrationDate);
        return date.month() === month;
    })
}

export const getTransactionByCategory = (transactionList: Transaction[], category: Category): Transaction[] => {
    return transactionList.filter((transaction: Transaction) => {
        return transaction.category === category;
    })
}

export const getTransactionValue = (transaction: Transaction): number => {
    return parseInt(transaction.debit ? transaction.debit: transaction.credit);
}

export const getSpendMap = (transactionList: Transaction[]) => {
    const result: any = {};
    transactionList.map((item: Transaction) => {
        if (!result[item.category]) {
            result[item.category] =  {
                times: 1,
                amount: getTransactionValue(item)
            }
        } else {
            result[item.category].times += 1;
            result[item.category].amount += getTransactionValue(item)
        }
        return null;
    });
    return result;
}

export const getTransactionByMonthForCategory = (transactionList: Transaction[], category: Category) => {
    const resultList: number[] = [];

    MONTHS.map((month:string, monthIndex: number) => {
        const transactionInMonth: Transaction[] = getTransactionInMonth(transactionList, monthIndex);
        const transactionByCategory = getTransactionByCategory(transactionInMonth, category);
        let result = 0;
        transactionByCategory.map((transaction: Transaction) => {
            result += Number.parseInt(transaction.debit || 0);
            return null;
        });
        resultList.push(result);
        return null;
    });

    return resultList;
}
