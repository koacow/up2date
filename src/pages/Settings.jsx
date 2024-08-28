// Model after monkeytype settings page
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';   
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SavedTopicsSettings from '../components/SavedTopicsSettings';
import AppearanceSettings from '../components/AppearanceSettings';
import { useState } from 'react';

export default function Settings() {
    const session = useSelector(state => state.session.session);
    const [ savedTopicsSettingsCollapsed, setSavedTopicsSettingsCollapsed ]= useState(true);
    const [ appearanceSettingsCollapsed, setAppearanceSettingsCollapsed ]= useState(true);

    const getOrientation = (expanded) => {
        return expanded ? 'rotate-180' : 'rotate-0';
    }

    const render = () => {
        if (session) {
            return (
                <Box className='w-full md:w-3/5 md:mx-auto space-y-5 my-5'>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' className='font-bold tracking-wider cursor-pointer flex items-center' onClick={() => setAppearanceSettingsCollapsed(prev => !prev)}>
                                Appearance
                                <ExpandMoreIcon className={`transform duration-500 ${getOrientation(!appearanceSettingsCollapsed)}`} />
                            </Typography>
                            <Collapse in={!appearanceSettingsCollapsed} unmountOnExit>
                                <AppearanceSettings />
                            </Collapse>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' className='font-bold tracking-wider cursor-pointer' onClick={() => setSavedTopicsSettingsCollapsed(prev => !prev)}>
                                Your Saved Topics
                                <ExpandMoreIcon className={`transform duration-500 ${getOrientation(!savedTopicsSettingsCollapsed)}`} />
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