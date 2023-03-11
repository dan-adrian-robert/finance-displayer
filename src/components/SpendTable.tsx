import React, {FC, useState} from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Category, CATEGORY_LIST, Transaction, TransactionTye} from "../types";
import {useSelector} from "react-redux";
import {
   getTransactionList,
} from "../selectors";
import moment from "moment";
import {COLOR} from "../config/constants";
import {filterTransactionByCategory, getTransactionByType} from "../utils/filters";

export const getDateValue = (row: any, key: string) => {
    return moment(row[key]).format('DD/MMMM');
}

const filterStyle = {
    display:'flex',
    gap:'15px'
}

const selectStyle = {
    color:'blue',
    width: '15em',
}

export const TransactionList:FC<any> = () => {
    const activeTransactionList = useSelector(getTransactionList);
    const [selectedTransactionType, setTransactionType] = useState<TransactionTye>(TransactionTye.ALL)
    const [selectedCategory, setSelectedCategory] = useState<Category | TransactionTye.ALL>(TransactionTye.ALL);

    const getPercentage = () => {
        const otherItems = activeTransactionList.filter((item: any) => item.category === Category.OTHER);
        const list = activeTransactionList;
        const percentage = ((list.length - otherItems.length) / list.length) * 100;

        if (isNaN(percentage)) {
           return (<span></span>);
        }

        return <span style={{color: COLOR.GREEN, fontWeight:600}}>{percentage.toFixed(2)}% tagged</span>;
    }

    const onFormChange = (event: any) => {
        setTransactionType(event.target.value as TransactionTye);
    }

    const getFilteredTransactionList = () => {
       return  selectedCategory === TransactionTye.ALL ?
           getTransactionByType(activeTransactionList, selectedTransactionType) :
           filterTransactionByCategory(
            getTransactionByType(activeTransactionList, selectedTransactionType),
            selectedCategory as any
           );
    };

    if (activeTransactionList.length === 0) {
        return <div>There are no transactions yet</div>
    }

   return (
       <div>
           <div>{getPercentage()}</div>
           <Box sx={filterStyle}>
               <FormControl variant="standard" sx={selectStyle}>
                   <InputLabel id="demo-simple-select-label">Type</InputLabel>
                   <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={selectedTransactionType}
                       label="Category"
                       onChange={(selectChangeEvent) => {
                           onFormChange(selectChangeEvent)
                       }}
                   >
                       <MenuItem value={TransactionTye.SPENDINGS}>{TransactionTye.SPENDINGS}</MenuItem>
                       <MenuItem value={TransactionTye.EARNINGS}>{TransactionTye.EARNINGS}</MenuItem>
                       <MenuItem value={TransactionTye.ALL}>{TransactionTye.ALL}</MenuItem>
                   </Select>
               </FormControl>
               <FormControl variant="standard" sx={selectStyle}>
                   <InputLabel id="demo-simple-select-label">Category</InputLabel>
                   <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={selectedCategory}
                       label="Category"
                       onChange={(selectChangeEvent) => {
                        setSelectedCategory(selectChangeEvent.target.value as any);
                       }}
                   >
                       <MenuItem value={'ALL'}>ALL</MenuItem>
                       {CATEGORY_LIST.map((category:Category, index) => {
                           return (<MenuItem key={index} value={category}>{category}</MenuItem>)
                       })}
                   </Select>
               </FormControl>
           </Box>
           <TableContainer component={Paper} className='spendTable'>
                <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {getFilteredTransactionList().map((row: Transaction, keyIndex: number) => {
                           return(
                               <TableRow key={keyIndex}>
                                   <TableCell>{keyIndex + 1}</TableCell>
                                   <TableCell>{getDateValue(row, 'registrationDate')}</TableCell>
                                   <TableCell>
                                       <div style={{color:row.credit ? COLOR.GREEN: COLOR.RED , fontWeight:600}}>
                                            {row.credit ? row.credit:row.debit}
                                       </div>
                                   </TableCell>
                                   <TableCell>
                                       <div style={{color:row.category !== Category.OTHER ? COLOR.GREEN : COLOR.RED, fontWeight:600}}>
                                            {row.category}
                                       </div>
                                   </TableCell>
                                   <TableCell>{row.description}</TableCell>
                               </TableRow>
                           )
                     })}
                    </TableBody>
                </Table>
            </TableContainer>
       </div>
   )
}
