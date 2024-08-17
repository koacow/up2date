// Model after monkeytype settings page
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';   
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '../components/ExpandMore';
import SavedStocksSettings from '../components/SavedStocksSettings';
import SavedTopicsSettings from '../components/SavedTopicsSettings';
import AppearanceSettings from '../components/AppearanceSettings';
import { useState } from 'react';

export default function Settings() {
    const session = useSelector(state => state.session.session);
    const [ savedStocksSettingsCollapsed, setSavedStocksSettingsCollapsed ]= useState(true);
    const [ savedTopicsSettingsCollapsed, setSavedTopicsSettingsCollapsed ]= useState(true);
    const [ appearanceSettingsCollapsed, setAppearanceSettingsCollapsed ]= useState(true);

    const render = () => {
        if (session) {
            return (
                <>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>
                                Appearance
                                <ExpandMore expanded={!appearanceSettingsCollapsed} onClick={() => setAppearanceSettingsCollapsed(prev => !prev)} />
                            </Typography>
                            <Collapse in={!appearanceSettingsCollapsed} unmountOnExit>
                                <AppearanceSettings />
                            </Collapse>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>
                                Your Saved Topics
                                <ExpandMore expanded={!savedTopicsSettingsCollapsed} onClick={() => setSavedTopicsSettingsCollapsed(prev => !prev)} />
                            </Typography>
                            <Collapse in={!savedTopicsSettingsCollapsed} unmountOnExit>
                                <SavedTopicsSettings />
                            </Collapse>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>
                                Your Saved Stocks
                                <ExpandMore expanded={!savedStocksSettingsCollapsed} onClick={() => setSavedStocksSettingsCollapsed(prev => !prev)} />
                            </Typography>
                            <Collapse in={!savedStocksSettingsCollapsed} unmountOnExit >
                                <SavedStocksSettings />
                            </Collapse>
                        </CardContent>
                    </Card>
                </>
            )
        } else {
            return (
                <>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>
                                Please log in to customize your experience.
                            </Typography>
                        </CardContent>
                    </Card>
                </>
            )
        }
    }

    return (render());
}