import React, {FC, useEffect} from "react";
import * as XLSX from "xlsx";
import {getDataPointsFromSpendList} from "../utils";
import {useDispatch} from "react-redux";
import {setTransactions} from "../actions";

export const DataLoader:FC<any> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const transactionString = localStorage.getItem('transactions');
        if (transactionString) {
            const transactionMap = JSON.parse(transactionString);
            dispatch(setTransactions(transactionMap));
        }

    }, [dispatch]);

    const onChange = (e: any) => {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const byteStream = evt.target?.result;
            const wb = XLSX.read(byteStream, { type: "binary"});
            const result: any = {};
            wb.SheetNames.map((sheetName: string) => {
                const ws = wb.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_csv(ws);
                result[sheetName] = getDataPointsFromSpendList(data);
                return null;
            })
            localStorage.setItem('transactions', JSON.stringify(result));
            dispatch(setTransactions(result));
        };
        reader.readAsBinaryString(file);
    };

   return (
       <>
           <input type="file" onChange={onChange}/>
       </>
   )
}
