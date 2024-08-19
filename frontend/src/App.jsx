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
import Stocks from './pages/Stocks';
import Settings from './pages/Settings';
import ErrorBoundary from './ErrorBoundary.jsx'
import AppError from './AppError.jsx'

function App() {
  const darkMode = useSelector(state => state.settings.settings.display.darkMode);
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
    <Route path="/login" element={<LogIn />} errorElement={<AppError />} />,
    <Route path="/register" element={<Register />} errorElement={<AppError />} />,
    <Route path="/register/configure-preferences" element={<ConfigurePreferences />} errorElement={<AppError />} />,
    <Route path='/reset-password' element={<ResetPassword />} errorElement={<AppError />} />,
    <Route path='/' element={<MainTemplate />} errorElement={<AppError />} >
      <Route index element={<Home />} errorElement={<AppError />} />,
      <Route path='/search' element={<Search />} errorElement={<AppError />} />,
      <Route path='/stocks' element={<Stocks />} errorElement={<AppError />} />
      <Route path='/settings' element={<Settings />} errorElement={<AppError />} />,
    </Route>,
    <Route path="*" element={<NotFound />} />
  ]));

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ErrorBoundary fallback={<AppError />}>
          <RouterProvider router={AppRouter} />
        </ErrorBoundary>
      </ThemeProvider>
    </>
  )
}

export default App;
