import { updateSettingsAsync } from '../state/slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

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
        <Card>
            <CardHeader title='Appearance' />
            <CardActions>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={darkModeChecked} onChange={handleChange} />}
                        label='Dark Mode'
                    />
                </FormGroup>
            </CardActions>
        </Card>
    )
}