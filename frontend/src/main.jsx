import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './state/store.js'
import { Provider } from 'react-redux'
import ErrorBoundary from './ErrorBoundary.jsx'
import AppError from './AppError.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>      
    <React.StrictMode>
        <ErrorBoundary fallback={<AppError />}>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
  </Provider>,
)
