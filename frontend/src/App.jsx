import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';
import About from './pages/About';
import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import ConfigurePreferences from './pages/ConfigurePreferences';
import Home from './pages/Home';
import MainTemplate from './pages/MainTemplate';
import Search from './pages/Search';
import ResetPassword from './pages/ResetPassword';

function App() {
  const darkMode = useSelector(state => state.settings.display.darkMode);
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
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  });

  const theme = createTheme(getDesignTokens());

  const AppRouter = createBrowserRouter(createRoutesFromElements([
    <Route path="/about" element={<About />} />,
    <Route path="/login" element={<LogIn />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="/register/configure-preferences" element={<ConfigurePreferences />} />,
    <Route path='/reset-password' element={<ResetPassword />} />,
    <Route path='/' element={<MainTemplate />} >
      <Route index element={<Home />} />,
      <Route path='/search' element={<Search />} />
    </Route>,
    <Route path="*" element={<NotFound />} />
  ]));

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
