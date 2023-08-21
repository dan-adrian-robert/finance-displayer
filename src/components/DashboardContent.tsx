import React, {useEffect} from 'react';
import { Box } from "@mui/material";
import {Route, Routes } from 'react-router-dom';
import {DataLoader} from "./DataLoader";
import {ROUTES} from "../config/routes";
import SpendView from "../views/SpendView";
import TypeCharView from "../views/TypeChartView";
import {BreakDownView} from "../views/BreakDownView";
import SpendBubbleChartView from "../views/SpendBubbleChartView";
import {useDispatch} from "react-redux";
import {setTransactions} from "../actions";
import { buildTransactionMap } from "../mappers/transaction.mapper";
import {SpendListView} from "../views/SpendListView";
import ColorEditorView from "../views/ColorEditorView";
import {getTransactionDB} from "../services/storage.service";

const styles = {
    root: {
        padding: '1rem',
        color: 'rgba(255,255,255,0.7)'
    },
}
export const DashboardContent= () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const rawTransactions: any = getTransactionDB();

        console.log(rawTransactions);

        const transactionMap = buildTransactionMap(rawTransactions)

        console.log(transactionMap);

        dispatch(setTransactions(transactionMap));
    }, []);

    return (
        <Box sx={styles.root}>
            <Routes>
                <Route index  element={<DataLoader/>} />
                <Route path={ROUTES.loader} element={<DataLoader />}/>
                <Route path={ROUTES.colorEditor} element={<ColorEditorView />}/>
                <Route path={ROUTES.transactions} element={<SpendListView />}/>
                <Route path={ROUTES.spending} element={<SpendView />}/>
                <Route path={ROUTES.category} element={<TypeCharView />}/>
                <Route path={ROUTES.breakdown} element={<SpendBubbleChartView />}/>
                <Route path={ROUTES.breakdown} element={<BreakDownView />}/>
            </Routes>
        </Box>
    );
}
