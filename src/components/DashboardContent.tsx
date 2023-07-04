import React, {useEffect} from 'react';
import { Box } from "@mui/material";
import {Route, Routes } from 'react-router-dom';
import {DataLoader} from "./DataLoader";
import {ROUTES} from "../config/routes";
import {TransactionList} from "./SpendTable";
import SpendView from "../views/SpendView";
import TypeCharView from "../views/TypeChartView";
import {BreakDownView} from "../views/BreakDownView";
import SpendBubbleChartView from "../views/SpendBubbleChartView";
import {getStaticDB} from "../services/storage.service";
import {useDispatch} from "react-redux";
import {setTransactions} from "../actions";

const styles = {
    root: {
        padding: '1rem',
        color: 'rgba(255,255,255,0.7)'
    },
}
export const DashboardContent= () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTransactions(getStaticDB()));
    }, []);

    return (
        <Box sx={styles.root}>
            <Routes>
                <Route index  element={<DataLoader/>} />
                <Route path={ROUTES.loader} element={<DataLoader />}/>
                <Route path={ROUTES.transactions} element={<TransactionList />}/>
                <Route path={ROUTES.spending} element={<SpendView />}/>
                <Route path={ROUTES.category} element={<TypeCharView />}/>
                <Route path={ROUTES.breakdown} element={<SpendBubbleChartView />}/>
                <Route path={ROUTES.breakdown} element={<BreakDownView />}/>
            </Routes>
        </Box>
    );
}
