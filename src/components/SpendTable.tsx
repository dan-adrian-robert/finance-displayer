import React, {FC} from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Category, Transaction} from "../types";
import {useSelector} from "react-redux";
import {
   getTransactionList,
} from "../selectors";
import moment from "moment";

export const getDateValue = (row: any, key: string) => {
    return moment(row[key]).format('DD/MMMM yy');
}

export const TransactionList:FC<any> = () => {
    const activeTransactionList = useSelector(getTransactionList);

    const getPercentage = () => {
        const otherItems = activeTransactionList.filter((item: any) => item.category === Category.OTHER);
        const list = activeTransactionList;
        const percentage = ((list.length - otherItems.length) / list.length) * 100;

        if (isNaN(percentage)) {
           return (<span></span>);
        }

        return <span style={{color:'#3dae23', fontWeight:600}}>{percentage.toFixed(2)}% tagged</span>;
    }

    if (activeTransactionList.length === 0) {
        return <div>There are no transactions yet</div>
    }

   return (
       <div>
           <div>{getPercentage()}</div>
           <TableContainer component={Paper} className='spendTable'>
                <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>registrationDate</TableCell>
                            <TableCell>month</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {activeTransactionList.map((row: Transaction, keyIndex: number) => {
                           return(
                               <TableRow key={keyIndex}>
                                   <TableCell>{keyIndex + 1}</TableCell>
                                   <TableCell>{getDateValue(row, 'registrationDate')}</TableCell>
                                   <TableCell>{moment(row.registrationDate).month()}</TableCell>
                                   <TableCell>
                                       <span style={{color:row.credit?'#3dae23':'#e8464a', fontWeight:600}}>
                                        {row.credit ? row.credit:row.debit}
                                       </span>
                                   </TableCell>
                                   <TableCell>{row.description}</TableCell>
                                   <TableCell>
                                       <div style={{color:row.category !== Category.OTHER ? '#3dae23':'#e8464a', fontWeight:600}}>{row.category}</div>
                                   </TableCell>
                               </TableRow>
                           )
                     })}
                    </TableBody>
                </Table>
            </TableContainer>
       </div>
   )
}
