import React, {FC} from 'react';
import {getTransactionMap} from "../selectors";
import {useSelector} from "react-redux";
import SpendChart from "../components/SpendChart";
import {YEARS} from "../config/constants";
import {Box} from "@mui/material";

const styles = {
    root: {
        alignItems:'center',
        justifyContent:'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        gap:'2em'
    },
}
export const SpendView:FC<any> = () => {
    const transactionMap: any = useSelector(getTransactionMap);

    if (!transactionMap) {
        return null;
    }

    return (
        <Box sx={styles.root}>
            {YEARS.map((year: number, yearKey) => {
                return (
                    <div style={{width: '30em', height: '24em'}} key={yearKey}>
                        <SpendChart transactionList={transactionMap[year]} year={year}/>
                    </div>
                )
            })}
        </Box>
    );
}

export default SpendView;

