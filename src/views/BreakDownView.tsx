import React, {FC, useState} from 'react';
import {SpendByCategory} from "../components/SpendByCategory";
import {useSelector} from "react-redux";
import {getSelectedYear, getTransactionList} from "../selectors";
import {Month, Transaction} from "../types";
import { MONTHS } from '../config/constants';
import {filterTransactionByMonth} from "../utils/filters";

export const BreakDownView:FC<any> = () => {
    const [monthList] = useState(MONTHS);
    const activeTransactionList: Transaction[] = useSelector(getTransactionList);
    const activeYear: number = useSelector(getSelectedYear);

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', gap:'2em'}}>
           {monthList.map((month: Month, monthIndex: number) => {
               return (
                    <div style={{width: '34em', height:'20em'}} key={monthIndex}>
                        <SpendByCategory
                            transactionList={filterTransactionByMonth(activeTransactionList, month.index - 1)}
                            year={activeYear}
                            month={month.value}
                        />
                    </div>
                )
           })}
       </div>
    )
}


