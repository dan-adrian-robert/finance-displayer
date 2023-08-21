import {createSelector} from "@reduxjs/toolkit";

const mainState = (state: any) => state;
export const getTransactions = createSelector(mainState, ({transactions}) => transactions)
export const getTransactionMap = createSelector(getTransactions, ({transactionMap}) => transactionMap)
export const getYearList = createSelector(getTransactions, ({yearList}) => yearList)
export const getSelectedYear = createSelector(getTransactions, ({selectedYear}) => selectedYear)
export const getTransactionList = createSelector(getTransactions, ({transactionMap, selectedYear}) => {
    return transactionMap[selectedYear];
})