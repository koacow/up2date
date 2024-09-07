import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline, responsiveFontSizes } from '@mui/material';
import './App.css';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import MainTemplate from './pages/MainTemplate';
import Search from './pages/Search';
import Stocks from './pages/Stocks';
import Stock from './pages/Stock';
import Settings from './pages/Settings';
import ErrorBoundary from './ErrorBoundary.jsx'
import AppError from './AppError.jsx'
import ComingSoon from './pages/ComingSoon.jsx';

const rootElement = document.getElementById('root');

function App() {
  const darkMode = useSelector(state => state.settings.settings.display.darkMode);
  const theme = responsiveFontSizes(createTheme({
    palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
              main: "#8e4ccf",
              light: "#a46fd8",
              dark: "#633590",
              contrastText: "#f2f9fb"
          },
          secondary: {
              main: "#cf8e4c",
              light: "#d8a46f",
              dark: "#906335",
              contrastText: "#0d0d0d"
          },
          error: {
              main: "#ff1507"
          },
          warning: {
              main: "#ff8000"
          },
          success: {
              main: "#00ff00"
          },
          info: {
              main: "#246bfd"
          },
          destroy: {
            main: '#ff1507',
            contrastText: '#f2f9fb'
          }
      },
      typography: {
          fontFamily: "Montserrat, sans-serif",
      },
      components: {
          MuiSwitch: {
              defaultProps: {
                  color: "info"
              }
          },
          MuiPopover: {
              defaultProps: {
                  container: rootElement
              }
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
              }
            }
          },
          MuiPopper: {
              defaultProps: {
                  container: rootElement
              }
          },
          MuiDialog: {
              defaultProps: {
                  container: rootElement
              }
          },
          MuiModal: {
              defaultProps: {
                  container: rootElement
              }
          }
      }
  }));

  const AppRouter = createBrowserRouter(createRoutesFromElements([
    <Route path="/about" element={<About />} />,
    // <Route path="/login" element={<LogIn />} errorElement={<AppError />} />,
    // <Route path="/register" element={<Register />} errorElement={<AppError />} />,
    // <Route path="/register/configure-preferences" element={<ConfigurePreferences />} errorElement={<AppError />} />,
    // <Route path='/reset-password' element={<ResetPassword />} errorElement={<AppError />} />,
    <Route path='/' element={<MainTemplate />} errorElement={<AppError />} >
      <Route index element={<Home />} errorElement={<AppError />} />,
      <Route path='/search' element={<Search />} errorElement={<AppError />} />,
      <Route path='/stocks' element={<Stocks />} errorElement={<AppError />} />,
      <Route path='/stocks/:ticker' element={<Stock />} errorElement={<AppError />} />, 
      <Route path='/settings' element={<Settings />} errorElement={<AppError />} />,
      <Route path='/login' element={<ComingSoon />} errorElement={<AppError />} />,
      <Route path='/register' element={<ComingSoon />} errorElement={<AppError />} />,
      <Route path="*" element={<NotFound />} />
    </Route>,
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
