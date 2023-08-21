import React, { useState } from "react";
import {CustomFileInput} from "./CustomFileInput";
import * as XLSX from "xlsx";
import {convertWBtoJSON} from "../services/excel.service";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Box } from "@mui/material";
import {updateTransactionDB} from "../services/storage.service";

const styles: any = {
    rowSize: {
        display: 'flex',
        gap: '8px',
    },
};

export const DataLoader:React.FC<{}> = () => {
    const [messageOpen, setMessageOpen] = useState(false);
    const [loadingFile, setLoadingFile] = useState(false)
    const onChange = (event: any): void => {
        const file = event.target.files[0];
        setLoadingFile(true);
        const reader = new FileReader();
        reader.onload = (fileEvent: any)=> {
            const data = new Uint8Array(fileEvent.target.result);
            const workbook: XLSX.WorkBook = XLSX.read(data, {type: 'array'});

            const rawExcelData = convertWBtoJSON(workbook);
            updateTransactionDB(rawExcelData);
            setMessageOpen(true);
            setLoadingFile(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleClose = () => {
        setMessageOpen(false);
    };

   return (
       <Box sx={styles.rowSize}>
           <Snackbar
               anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
               }}
               open={messageOpen}
               autoHideDuration={2000}
               onClose={handleClose}
           >
               <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                   Successfully loaded data from Excel
               </Alert>
           </Snackbar>
           <CustomFileInput onChange={onChange}/>
           {loadingFile && <Box>Loading...</Box>}
       </Box>
   )
}
