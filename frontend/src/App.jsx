import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
function App() {
  const AppRouter = createBrowserRouter(createRoutesFromElements([
    <Route path="/" element={<Index />} />,
    <Route path="/login" element={<LogIn />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="*" element={<NotFound />} />
  ]));
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App;
