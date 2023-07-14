import React, {FC, useState} from "react";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Category, CATEGORY_LIST, Transaction, TransactionTye} from "../types";
import {useSelector} from "react-redux";
import {
   getTransactionList,
} from "../selectors";
import {COLOR} from "../config/constants";
import {filterTransactionByCategory, getTransactionByType} from "../utils/filters";
import { getDateValue } from "../utils/formaters";
import {SMenuItem, SSelect, STableCell } from "./StyledComponents";
import {YearSelector} from "./YearSelector";

const styles = {
    customCell : {
        backgroundColor: '#121734',
        color: 'white',
    },
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
    filterSection: {
        display:'flex',
        gap:'15px'
    },
    customSelect: {
        color:'blue',
        width: '15em',
    },
    root: {
        display: 'flex',
        flexDirection:'column',
        gap: '8px',
    }
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
    //
    const getFilteredTransactionList = () => {
       return  selectedCategory === TransactionTye.ALL ?
           getTransactionByType(activeTransactionList, selectedTransactionType) :
           filterTransactionByCategory(
            getTransactionByType(activeTransactionList, selectedTransactionType),
            selectedCategory as any
           );
    };

    if (!activeTransactionList || activeTransactionList.length === 0) {
        return <div>There are no transactions yet</div>
    }

   return (
       <Box sx={styles.root}>
           <YearSelector/>
           {/*<Box>{getPercentage()}</Box>*/}
           <Box sx={styles.filterSection}>
               <FormControl variant="standard" sx={styles.customSelect}>
                   <InputLabel id="type-label">Type</InputLabel>
                   <SSelect
                       labelId="type-label"
                       id="type-label"
                       value={selectedTransactionType}
                       label="Category"
                       onChange={(selectChangeEvent) => {
                           onFormChange(selectChangeEvent)
                       }}
                   >
                       <SMenuItem value={TransactionTye.SPENDINGS}>{TransactionTye.SPENDINGS}</SMenuItem>
                       <SMenuItem value={TransactionTye.EARNINGS}>{TransactionTye.EARNINGS}</SMenuItem>
                       <SMenuItem value={TransactionTye.ALL}>{TransactionTye.ALL}</SMenuItem>
                   </SSelect>
               </FormControl>
               <FormControl variant="standard" sx={styles.customSelect}>
                   <InputLabel id="category-label">Category</InputLabel>
                   <Select
                       labelId="category-label"
                       id="category-label"
                       value={selectedCategory}
                       label="Category"
                       onChange={(selectChangeEvent) => {
                        setSelectedCategory(selectChangeEvent.target.value as any);
                       }}
                   >
                       <SMenuItem value={'ALL'}>ALL</SMenuItem>
                       {CATEGORY_LIST.map((category:Category, index) => {
                           return (<SMenuItem key={index} value={category}>{category}</SMenuItem>)
                       })}
                   </Select>
               </FormControl>
           </Box>
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
                        {getFilteredTransactionList().map((row: Transaction, keyIndex: number) => {
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
       </Box>
   )
}
