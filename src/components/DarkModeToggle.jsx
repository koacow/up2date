import { updateSettingsAsync } from '../state/slices/settingsSlice';
import { setDarkMode } from '../state/slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LightMode from '@mui/icons-material/LightMode';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';

export default function DarkModeToggle() {
    const settings = useSelector(state => state.settings.settings);
    const darkMode = settings.display.darkMode;
    const session = useSelector(state => state.session.session);
    const dispatch = useDispatch();
    const [ darkModeChecked, setDarkModeChecked ] = useState(darkMode);
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {
        setDarkModeChecked(darkMode);
    }, [session]);

    const toggleDarkMode = (e) => {
        e.preventDefault();
        if (session) {
            setDisabled(true);
            setDarkModeChecked(!darkMode);
            dispatch(updateSettingsAsync({
                ...settings,
                display: {
                    ...settings.display,
                    darkMode: !darkMode
                }
            })).then(() => {
                setDisabled(false);
            });
        } else {
            setDisabled(true);
            setDarkModeChecked(!darkMode);
            dispatch(setDarkMode(!darkMode));
            setDisabled(false);
        }
    }

    return (
        <Tooltip title='Toggle dark mode'>
            <IconButton disabled={disabled} onClick={toggleDarkMode}>
                <Typography className='hidden'>
                    Toggle dark mode
                </Typography>
                {darkModeChecked ? <DarkModeOutlined /> : <LightMode />}
            </IconButton>
        </Tooltip>            
    )
}