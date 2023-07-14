import React, {FC} from 'react';
import {getSelectedYear, getTransactionMap} from "../selectors";
import {useSelector} from "react-redux";
import SpendChart from "../components/SpendChart";
import {Box} from "@mui/material";
import {YearSelector} from "../components/YearSelector";

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
    const selectedYear: number = useSelector(getSelectedYear);

    if (!transactionMap) {
        return null;
    }

    return (
        <Box>
            <YearSelector/>
            <Box sx={styles.root}>
                <div style={{width: '30em', height: '24em'}}>
                    <SpendChart transactionList={transactionMap[selectedYear]} year={selectedYear}/>
                </div>
            </Box>
        </Box>
    );
}

export default SpendView;

