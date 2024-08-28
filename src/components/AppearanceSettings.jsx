import { updateSettingsAsync } from '../state/slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

export default function AppearanceSettings() {
    const settings = useSelector(state => state.settings.settings);
    const darkMode = settings.display.darkMode;
    const dispatch = useDispatch();
    const [darkModeChecked, setDarkModeChecked] = useState(darkMode);

    const handleChange = (e) => {
        setDarkModeChecked(e.target.checked);
        dispatch(updateSettingsAsync({
            ...settings,
            display: {
                ...settings.display,
                darkMode: e.target.checked
            }
        }));
    }

    return (
        <FormGroup>
            <FormControlLabel
                label='Dark Mode'
                labelPlacement='end'
                control={<Switch checked={darkModeChecked} onChange={handleChange} />}
            />
        </FormGroup>
    )
}