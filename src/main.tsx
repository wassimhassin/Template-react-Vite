import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { TicketsProvider } from './components/TicketsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TicketsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TicketsProvider>
  </React.StrictMode>,
)
