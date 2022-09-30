import {Category, Transaction} from "../types";
import moment from "moment";

export const filterTransactionByMonth = (transactionList: Transaction[], month: number): Transaction[] => {
    return transactionList.filter((transaction: Transaction) => {
        const date = moment(transaction.registrationDate);
        return date.month() === month;
    })
}

export const filterTransactionByCategory = (transactionList: Transaction[], category: Category): Transaction[] => {
    return transactionList.filter((transaction: Transaction) => {
        return transaction.category === category;
    })
}

export const filterTransactionByDay =  (transactionList: Transaction[], day: number): Transaction[] => {
    return transactionList.filter((transaction: Transaction) => {
        const date = moment(transaction.registrationDate);
        return date.date() === day;
    })
}

export const filterTransactionByYear = (transactionList: Transaction[], year: number): Transaction[] => {
    return transactionList.filter((transaction: Transaction) => {
        // const date = moment(transaction.registrationDate);
        // console.log(date.year())
        // return date.year() === year;
        return true;
    })
}
