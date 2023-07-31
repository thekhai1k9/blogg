import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query'
import store from './store'
import '../src/assets/styles/app.css'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}></QueryClientProvider>
      </Provider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
)
