import Navbar from '../components/Navbar'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Home from '../pages/Home/Home'
import Single from '../pages/Single'
import Write from '../pages/Write'
import { Outlet, Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer'
import EditInfomation from '../pages/EditInfomation'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='/post/:id' element={<Single />} />
      <Route path='/write/:id' element={<Write />} />
      <Route path='/edit-thong-tin' element={<EditInfomation />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/write' element={<Write />} />
    </Route>
  </Routes>
)

export default router
