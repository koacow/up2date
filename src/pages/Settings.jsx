// Model after monkeytype settings page
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';   
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SavedTopicsSettings from '../components/SavedTopicsSettings';
import { useState } from 'react';

export default function Settings() {
    const [ savedTopicsSettingsCollapsed, setSavedTopicsSettingsCollapsed ]= useState(true);

    const getOrientation = (expanded) => {
        return expanded ? 'rotate-180' : 'rotate-0';
    }

    return (
        <Box className='w-full md:w-3/5 md:mx-auto space-y-5 my-5'>
            <Card>
                <CardContent>
                    <Typography variant='h4' component='h1' className='font-bold tracking-wider cursor-pointer' onClick={() => setSavedTopicsSettingsCollapsed(prev => !prev)}>
                        What would you like to be Up2Date on?
                        <ExpandMoreIcon className={`transform duration-500 ${getOrientation(!savedTopicsSettingsCollapsed)}`} />
                    </Typography>
                    <Collapse in={!savedTopicsSettingsCollapsed} unmountOnExit>
                        <SavedTopicsSettings />
                    </Collapse>
                </CardContent>
            </Card>
        </Box>
    )
}