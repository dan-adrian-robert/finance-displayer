import React, {useState} from 'react';
import './App.css';
import {Box, Tab, Tabs} from "@mui/material";
import {DataLoader} from "./components/DataLoader";
import {useDispatch, useSelector} from 'react-redux'
import {TransactionList} from "./components/SpendTable";
import {TransactionTypes} from "./components/TransactionTypes";
import {CustomSelector} from "./components/CustomSelector";
import {getTransactions} from "./selectors";
import {TransactionState} from "./types";
import {setSelectedYear} from "./actions";
import {SpendByCategory} from "./components/SpendByCategory";
import SpendView from "./views/SpendView";
import SpendBubbleChartView from "./views/SpendBubbleChartView";
import TypeCharView from "./views/TypeChartView";
import {BreakDownView} from "./views/BreakDownView";

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
                    {children}
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
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const transactionData: TransactionState = useSelector(getTransactions);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onSelectChange = (event: any) => {
        dispatch(setSelectedYear(event.target.value));
    }

    return (
        <Box sx={{ width: '100%' }} component={"div"}>
            <CustomSelector
                itemList={transactionData.yearList}
                onSelectChange={onSelectChange}
                selectedItem={transactionData.selectedYear}
            />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Load Data" {...a11yProps(0)} />
                    <Tab label="Transaction List" {...a11yProps(1)} />
                    <Tab label="Spend Chart" {...a11yProps(2)} />
                    <Tab label="Type Chart" {...a11yProps(3)} />
                    <Tab label="BubbleChart" {...a11yProps(4)} />
                    <Tab label="BreakDownByMonth" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DataLoader/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TransactionList/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SpendView/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TypeCharView/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <SpendBubbleChartView/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <BreakDownView/>
            </TabPanel>
        </Box>
    );
}

export default App;
