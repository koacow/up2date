import { 
    Container,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserSavedTopicsThunk } from "../state/slices/topicsSlice";

export default function YourPreferences() {
    const navigate = useNavigate();
    const session = useSelector(state => state.session.session);
    useEffect(() => {
        if (!session) navigate('/login');
    }, [session, navigate]);

    const dispatch = useDispatch();
    const topics = useSelector(state => state.topics.topics);
    const loading = useSelector(state => state.topics.updateTopicsLoading);
    const error = useSelector(state => state.topics.updateTopicsError);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateUserSavedTopicsThunk(selectedTopics)).unwrap();
    };

    const handleChange = (e) => {
        const topicId = Number(e.target.name);
        setSelectedTopics((prev) => {
            const selected = prev.includes(topicId);
            if (selected) {
                return prev.filter((id) => id !== topicId);
            } else {
                return [...prev, topicId];
            }
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3" sx={{
                    mb: 2,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }} >
                    What do you want to be Up2Date on?
                </Typography>
                <Box component='form' onSubmit={handleSubmit} >
                    <Grid container spacing={3}>
                        {
                            topics.map((topic) => {
                                return (
                                    <Grid item xs={4} key={topic.id}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={handleChange}
                                                    name={topic.id.toString()}
                                                />
                                            }
                                            label={topic.topic}
                                        />
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Configuring your Up2Date feed...' : 'Confirm Preferences'}
                    </Button>
                    {
                        error && <Typography color="error">{error}</Typography>
                    }
                </Box>
            </Box>
        </Container>
    );
};