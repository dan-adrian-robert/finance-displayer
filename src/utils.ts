import {Category, Month, Transaction} from "./types";
import {TOKEN_LIST} from "./tokens";
import {DAYS, MONTHS, TRANSACTION_KEYS} from "./config/constants";
import {filterTransactionByCategory, filterTransactionByDay, filterTransactionByMonth} from "./utils/filters";
import {getTotalSpendAmount} from "./utils/transaction-wrappers";

export const stringToDate = (dateString: string) => {
    const [day,month,year] = dateString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).getTime();
}

export const noSavingsTransactions = (item: Transaction): boolean => {
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
            result[item.category].times = + 1;
            result[item.category].amount += getTransactionValue(item)
        }
        return null;
    });
    return result;
}

export const getTransactionByMonthForCategory = (transactionList: Transaction[], category: Category) => {
    const resultList: number[] = [];

    MONTHS.map((month:Month, monthIndex: number) => {
        const transactionInMonth: Transaction[] = filterTransactionByMonth(transactionList, monthIndex);
        const transactionByCategory: Transaction[] = filterTransactionByCategory(transactionInMonth, category);
        resultList.push(getTotalSpendAmount(transactionByCategory));
        return null;
    });

    return resultList;
}

export const getTransactionByDayInMonthForCategory = (transactionList: Transaction[], category: Category) => {
    const resultList: number[] = [];

    DAYS.map((day: number, dayIndex: number) => {
        const transactionInMonth: Transaction[] = filterTransactionByDay(transactionList, day);
        const transactionByCategory: Transaction[] = filterTransactionByCategory(transactionInMonth, category);
        resultList.push(getTotalSpendAmount(transactionByCategory));
        return null;
    });

    return resultList;
}

