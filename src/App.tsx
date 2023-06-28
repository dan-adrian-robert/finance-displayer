import React, {useState} from 'react';
import './App.css';
import {Box} from "@mui/material";
import {useDispatch} from 'react-redux'
import {DashboardMenu} from "./components/DashboardMenu";
import {DashboardContent} from "./components/DashboardContent";
import {DashboardHeader} from "./components/DashboardHeader";

const styles = {
    root: {
        width: 'calc(100vw - 2rem)',
        height: 'calc(100vh - 2rem)',
        margin: 0,
        backgroundColor:'#121734',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem'
    },
    body: {
        overflow: 'auto',
        backgroundColor:'#1D233D',
        flexGrow: '1',
        minHeight: 'calc(100vh - 5rem)',
        maxHeight: 'calc(100vh - 5rem)',
        borderRadius: '1em',
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
    menu: {
        borderRadius: '1em',
        width: '12rem',
        backgroundColor:'#1D233D',
    },
    content: {
        display: 'flex',
        gap: '1rem',
    },
    header: {
        height: '4rem',
        minHeight: '4rem'
    }
}

export const App = () => {
    // const dispatch = useDispatch();
    // const [value, setValue] = useState(0);
    // const transactionData: TransactionState = useSelector(getTransactions);

    // const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    //     setValue(newValue);
    // };
    //
    // const onSelectChange = (event: any): void => {
    //     dispatch(setSelectedYear(event.target.value));
    // }

    return (
        <Box sx={styles.root} component={"div"}>
            <Box sx={styles.header}>
                <DashboardHeader/>
            </Box>
            <Box sx={styles.content}>
              <Box sx={styles.menu}>
                  <DashboardMenu/>
              </Box>
              <Box sx={styles.body}>
                <DashboardContent/>
              </Box>
            </Box>
        </Box>
    );
}

export default App;
