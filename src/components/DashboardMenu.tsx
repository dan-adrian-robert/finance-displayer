import React from 'react';
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DataObjectIcon from '@mui/icons-material/DataObject';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddchartIcon from '@mui/icons-material/Addchart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes';

const tabList: any[] = [
    {
        text: 'Data Loader',
        icon: <DataObjectIcon color="primary"/>,
        route: ROUTES.loader,
    },
    {
        text: 'Transactions',
        icon:  <ViewListIcon color="primary"/>,
        route: ROUTES.transactions,
    },
    {
        text: 'Spend Chart',
        icon:  <LegendToggleIcon color="primary"/>,
        route: ROUTES.spending,
    },
    {
        text: 'Type Chart',
        icon:  <AddchartIcon color="primary"/>,
        route: ROUTES.category,
    },
    {
        text: 'Bubble Chart',
        icon:  <DonutSmallIcon color="primary"/>,
        route: ROUTES.breakdown,
    },
    {
        text: 'BreakDown by Month',
        icon:  <DonutLargeIcon color="primary"/>,
        route: ROUTES.breakdown,
    }
]

const style = {
    hoveredItem: {
        borderBottom:'1px solid #181C42',
        ':hover': {
            backgroundColor:'#181C42',
            color: 'white'
        }
    },
    activeRoute: {
        borderBottom:'1px solid rgba(255,255,255,0.7)',
    },
    root: {
        width: '100%',
        color:'rgba(255,255,255,0.7)',
    },
    menuList: {
        display: 'flex',
        flexDirection:'column',
        gap: '8px'
    }
};

export const DashboardMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateTo = (route: string) => {
        navigate(route);
    }

    const routeMatch = (route: string): any => {
        let baseStyle = {
            ... style.hoveredItem
        }

        if(`${location.pathname}` === route) {
            baseStyle = {
                ...baseStyle,
                ... style.activeRoute,
            }
        }

        return baseStyle;
    };

    return (
        <Box sx={style.root}>
            <List sx={style.menuList}>
                {tabList.map((tabItem, tabIndex) => {
                    return (
                        <ListItem
                            key={tabIndex}
                            onClick={() => navigateTo(tabItem.route)}
                            disablePadding
                            sx={routeMatch(tabItem.route)}
                        >
                            <ListItemButton >
                                <ListItemIcon>
                                    {tabItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={tabItem.text} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Divider />
        </Box>
    );
}
