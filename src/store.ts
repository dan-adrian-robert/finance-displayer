import transactionReducer from "./reducers/transactionReducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
    },
})
