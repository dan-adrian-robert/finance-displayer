import React from 'react';
import {Box, SelectChangeEvent, Typography} from "@mui/material";
import LOGO from '../logo.png';

const styles: any = {
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '48px',
        height: '48px',
        backgroundImage:`url(${LOGO})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    appDetails: {
        display: 'flex',
        alignItems: 'center',
        gap: '1em',
    },
    appName: {
        color:'rgba(255,255,255,0.7)',
        fontSize: '1.3rem',
        fontWeight: 600,
    }
};
export const DashboardHeader= () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={styles.root}>
            <Box sx={styles.appDetails}>
                <Box sx={styles.logo}></Box>
                <Typography sx={styles.appName}>Finance Visualizer</Typography>
            </Box>
        </Box>
    );
}
