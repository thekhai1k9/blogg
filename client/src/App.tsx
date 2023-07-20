import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import router from './routes/route'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/styles/home_page.scss'
import { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
  return (
    <div className='app'>
      <div className='container'>
        <BrowserRouter>{router}</BrowserRouter>
        <Toaster position='top-right' reverseOrder={false} />
      </div>
    </div>
  )
}

export default App
