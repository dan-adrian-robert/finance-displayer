import React, {FC} from 'react';
import {getTransactionMap} from "../selectors";
import {useSelector} from "react-redux";
import SpendChart from "../components/SpendChart";
import {YEARS} from "../config/constants";

export const SpendView:FC<any> = () => {
    const transactionMap: any = useSelector(getTransactionMap);

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', gap:'2em'}}>
            {YEARS.map((year: number, yearKey) => {
                return (
                    <div style={{width: '30em', height: '24em'}} key={yearKey}>
                        <SpendChart transactionList={transactionMap[year]} year={year}/>
                    </div>
                )
            })}
        </div>
    );
}

export default SpendView;

