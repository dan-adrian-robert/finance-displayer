import React, {useState} from 'react';
import './App.css';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {DataLoader} from "./components/DataLoader";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Load Data" {...a11yProps(0)} />
                    <Tab label="Transaction List" {...a11yProps(1)} />
                    <Tab label="Spend Chart" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DataLoader/>
            </TabPanel>
            <TabPanel value={value} index={1}>Transaction List</TabPanel>
            <TabPanel value={value} index={2}>Spend Chart</TabPanel>
        </Box>
        // <div className="App">
        //     <input type="file" onChange={onChange}/>
        //     <SpendChart spendList={data}/>
        //     <TransactionTypes spendList={data}/>
        //     <SpendTable spendList={data}/>
        // </div>
    );
}

export default App;
