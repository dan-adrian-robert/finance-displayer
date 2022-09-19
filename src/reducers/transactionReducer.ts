import {TransactionState} from "../types";

const initialState: TransactionState = {
    yearList: [],
    selectedYear: 0,
    transactionMap: {
    }
}

const buildTransactionState = (payload: any): TransactionState  => {
    const yearList = Object.keys(payload);
    return {
        yearList,
        selectedYear: yearList[0],
        transactionMap: payload
    }
}


export default function transactionReducer (state:TransactionState = initialState, action: any) {
    switch (action.type) {
        case ('SET/TRANSACTIONS'): {
            return buildTransactionState(action.payload);
        }
        case ('SET/SELECTED/YEAR'): {
            return {
                ...state,
                selectedYear: action.payload
            }
        }
        default:
            return state
    }
}