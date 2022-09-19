import {createAction} from "@reduxjs/toolkit";

export const setTransactions = createAction<any>('SET/TRANSACTIONS');
export const setSelectedYear = createAction<any>('SET/SELECTED/YEAR');