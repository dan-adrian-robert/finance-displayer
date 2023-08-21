import React, {FC} from "react";
import {
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { Category, Transaction } from "../types";
import {useSelector} from "react-redux";
import {
   getTransactionList,
} from "../selectors";
import {COLOR} from "../config/constants";
import { getDateValue } from "../utils/formaters";
import { STableCell } from "./StyledComponents";

const styles = {
    header: {
        minWidth: 500,
        backgroundColor: '#121734',
    },
    table: {
        "::-webkit-scrollbar": {
            width: '10px',
        },
        "::-webkit-scrollbar-thumb": {
            backgroundColor: '#694AD6',
            borderRadius: '5px',
        },
        "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: '#694AD6',
        },
    },
}

interface IProps {
    transactionList: Array<Transaction>
}

export const TransactionTable:FC<IProps> = ({transactionList}) => {
    const activeTransactionList = useSelector(getTransactionList);

    if (!activeTransactionList || activeTransactionList.length === 0) {
        return <div>There are no transactions yet</div>
    }

   return (
       <TableContainer component={Box} sx={styles.table}  className='spendTable'>
            <Table stickyHeader sx={styles.header} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <STableCell>Index</STableCell>
                        <STableCell>Date</STableCell>
                        <STableCell>Amount</STableCell>
                        <STableCell>Category</STableCell>
                        <STableCell>Description</STableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionList.map((row: Transaction, keyIndex: number) => {
                       return(
                           <TableRow key={keyIndex}>
                               <STableCell>{keyIndex + 1}</STableCell>
                               <STableCell>{getDateValue(row, 'registrationDate')}</STableCell>
                               <STableCell>
                                   <div style={{color:row.credit ? COLOR.GREEN: COLOR.RED , fontWeight:600}}>
                                        {row.credit ? row.credit:row.debit}
                                   </div>
                               </STableCell>
                               <STableCell>
                                   <div style={{color:row.category !== Category.OTHER ? COLOR.GREEN : COLOR.RED, fontWeight:600}}>
                                        {row.category}
                                   </div>
                               </STableCell>
                               <STableCell>{row.description}</STableCell>
                           </TableRow>
                       )
                 })}
                </TableBody>
            </Table>
        </TableContainer>
   )
}
