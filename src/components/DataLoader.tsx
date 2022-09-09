import React, {FC, useState} from "react";
import * as XLSX from "xlsx";
import {getDataPointsFromSpendList} from "../utils";

export const DataLoader:FC<any> = () => {
    const [data, setData] = useState([]);
    const onChange = (e: any) => {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: "binary"});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws);
            const transactionList = getDataPointsFromSpendList(data);
            setData(transactionList);
        };
        reader.readAsBinaryString(file);
    };

   return (
       <>
           <input type="file" onChange={onChange}/>
       </>
   )
}
