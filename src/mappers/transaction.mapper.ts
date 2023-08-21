import {Category, Transaction } from "../types";
import moment from "moment";
import {TOKEN_LIST} from "../config/tokens";
import {numberConvertor} from "./convertors";

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

export const getDateFromString = (date: string): number => {
    if (!date) {
        return 0;
    }

    if(date.length !== '02/12/2021'.length) {
        return 0;
    }

    const [dayString,monthString,yearString] = date.split('/');

    const day = parseInt(dayString);
    const month = parseInt(monthString);
    const year = parseInt(yearString);

    return moment({day, month: month - 1, year}).valueOf();
}

export const mapToTransaction = (rawTransactions: any[]): Transaction[] => {
    return rawTransactions.map((item, itemIndex) => {

        const {registerDate, transactionDate, debit, credit, opNumber, beneficiaryCode, finalOrderer,
            finalBeneficiary, sourceName, sourceBankName, accoutNumber, description } = item;

        const creditValue = numberConvertor(credit) as any;
        const debitValue = numberConvertor(debit) as any;

        const transaction: Transaction = {
            accNumber: accoutNumber,
            bankName: sourceBankName ? sourceBankName : null,
            category: getTransactionCategory(item),
            credit: creditValue,
            debit: debitValue,
            description,
            finalBenefactor: finalBeneficiary,
            fiscalCode: undefined,
            numOP: undefined,
            ordination: undefined,
            registrationDate: getDateFromString(registerDate),
            targetName: sourceName,
            transactionDate:getDateFromString(transactionDate)
        }

        return transaction;
    });
}

export const buildTransactionMap = (rawTransactionMap: any): Record<string, Transaction[]> => {
    const result: any = {};
    const yearList = Object.keys(rawTransactionMap);

    yearList.map((year)=> {
        result[year] = mapToTransaction(rawTransactionMap[year]);
    })

    return result;
}


