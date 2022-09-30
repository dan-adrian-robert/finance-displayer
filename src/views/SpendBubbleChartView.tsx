import React, {FC, useState} from 'react';
import {getTransactionList, getTransactionMap} from "../selectors";
import {useSelector} from "react-redux";
import {TransactionByMonth} from "../components/TransactionByMonth";
import {MONTHS} from "../config/constants";
import {Month, Transaction} from "../types";

export const SpendBubbleChartView:FC<any> = () => {
    const transactionMap: any = useSelector(getTransactionMap);
    const [monthList] = useState(MONTHS);
    const activeTransactionList: Transaction[] = useSelector(getTransactionList);

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', gap:'2em'}}>
            {monthList.map((month: Month, monthIndex: number) => {
                return (
                    <div style={{width: '26em'}} key={monthIndex}>
                        <TransactionByMonth transactionList={activeTransactionList} month={month}/>
                    </div>
                )
            })}
        </div>
    );
}

export default SpendBubbleChartView;

