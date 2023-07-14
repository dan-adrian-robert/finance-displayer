import {Category, Month, Transaction} from "./types";
import {DAYS, MONTHS} from "./config/constants";
import {filterTransactionByCategory, filterTransactionByDay, filterTransactionByMonth} from "./utils/filters";
import {getTotalSpendAmount} from "./utils/transaction-wrappers";

export const getTransactionValue = (transaction: Transaction): number => {
    return transaction.debit ? transaction.debit: transaction.credit;
}

export const getSpendMap = (transactionList: Transaction[]) => {
    const result: any = {};

    transactionList.map((item: Transaction) => {
        if (!result[item.category]) {
            result[item.category] =  {
                times: 1,
                amount: getTransactionValue(item),
            }
        } else {
            result[item.category].times = + 1;
            result[item.category].amount += getTransactionValue(item);
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

