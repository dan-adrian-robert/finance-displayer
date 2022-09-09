import React, {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Category, Transaction} from "./types";

export const getDateValue = (row: any, key: string) => {
   return row[key].format('DD/MMMM');
}

export const SpendTable:FC<any> = ({spendList}) => {

    const getPercentage = () => {
        const otherItems = spendList.filter((item: any) => item.category === Category.OTHER);
        const percentage = ((spendList.length - otherItems.length) /spendList.length) * 100;
        return <span style={{color:'#3dae23', fontWeight:600}}>{percentage.toFixed(2)}% tagged</span>;
    }

   return (
       <>
           <div>{getPercentage()}</div>
           <TableContainer component={Paper} className='spendTable'>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>registrationDate</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {spendList.map((row: Transaction, keyIndex: number) => {
                           return(
                               <TableRow key={keyIndex}>
                                   <TableCell>{keyIndex + 1}</TableCell>
                                   <TableCell>{getDateValue(row, 'registrationDate')}</TableCell>
                                   <TableCell>
                                       <span style={{color:row.credit?'#3dae23':'#e8464a', fontWeight:600}}>
                                        {row.credit ? row.credit:row.debit}
                                       </span>
                                   </TableCell>
                                   <TableCell>{row.description}</TableCell>
                                   <TableCell>
                                       <span style={{color:row.category !== Category.OTHER ? '#3dae23':'#e8464a', fontWeight:600}}>{row.category}</span>
                                   </TableCell>
                               </TableRow>
                           )
                     })}
                    </TableBody>
                </Table>
            </TableContainer>
       </>
   )
}
