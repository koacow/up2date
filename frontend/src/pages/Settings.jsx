// Model after monkeytype settings page
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';   
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import ExpandMore from '../components/ExpandMore';
import SavedTopicsSettings from '../components/SavedTopicsSettings';
import AppearanceSettings from '../components/AppearanceSettings';
import { useState } from 'react';

export default function Settings() {
    const session = useSelector(state => state.session.session);
    const [ savedTopicsSettingsCollapsed, setSavedTopicsSettingsCollapsed ]= useState(true);
    const [ appearanceSettingsCollapsed, setAppearanceSettingsCollapsed ]= useState(true);

    const render = () => {
        if (session) {
            return (
                <Box className='w-full md:w-3/5 md:mx-auto'>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' className='font-bold tracking-wider'>
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
                            <Typography variant='h5' className='font-bold tracking-wider'>
                                Your Saved Topics
                                <ExpandMore expanded={!savedTopicsSettingsCollapsed} onClick={() => setSavedTopicsSettingsCollapsed(prev => !prev)} />
                            </Typography>
                            <Collapse in={!savedTopicsSettingsCollapsed} unmountOnExit>
                                <SavedTopicsSettings />
                            </Collapse>
                        </CardContent>
                    </Card>
                </Box>
            )
        } else {
            return (
                <Box className='w-full md:w-3/5 md:mx-auto'>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>
                                Please log in to customize your experience.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )
        }
    }

    return (render());
}