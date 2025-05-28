import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AppContext } from './context/userContext'

function App() {
  const [context, setContext] = useState({})

  return (
    <AppContext.Provider
      value={{
        context,
        setContext
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
