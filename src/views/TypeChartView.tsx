import React, {FC, useState} from 'react';
import {getTransactionList} from "../selectors";
import {useSelector} from "react-redux";
import {MONTHS} from "../config/constants";
import {Month, Transaction} from "../types";
import {TransactionTypes} from "../components/TransactionTypes";
import {filterTransactionByMonth} from "../utils/filters";

const containerStyle: any = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '2em'
}

export const TypeCharView:FC<any> = () => {
    const [monthList] = useState<Month[]>(MONTHS);
    const activeTransactionList: Transaction[] = useSelector(getTransactionList);

    return (
        <div style={containerStyle}>
            {monthList.map((month, monthKey) => {
               return (
                   <div style={{width: '20em'}} key={monthKey}>
                       <TransactionTypes
                           transactionList={filterTransactionByMonth(activeTransactionList, month.index - 1)}
                           month={month}
                       />
                   </div>
                   )
            })}
        </div>
    );
}

export default TypeCharView;

