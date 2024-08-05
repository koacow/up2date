import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
function App() {
  const darkMode = useSelector(state => state.settings.display.darkMode);
  const AppRouter = createBrowserRouter(createRoutesFromElements([
    <Route path="/" element={<Index />} />,
    <Route path="/login" element={<LogIn />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="*" element={<NotFound />} />
  ]));

  const getDesignTokens = () => ({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode === false 
        ? {
          // palette values for light mode
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        }
        : {
          // palette values for dark mode
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
        }),
    }
  });

  const theme = createTheme(getDesignTokens());
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={AppRouter} />
      </ThemeProvider>
    </>
  )
}

export default App;
