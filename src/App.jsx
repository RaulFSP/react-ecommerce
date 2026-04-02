import './App.css'
import { Route, Routes } from 'react-router'
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Checkout from "./pages/Checkout"
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import ProductDetail from "./pages/ProductDetail"
import CartProvider from './context/CartContext'
function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <div className='app'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/auth' element={<Auth />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/products/:id' element={<ProductDetail />}></Route>
          </Routes>
        </div >
      </CartProvider>
    </AuthProvider>
  )
}

export default App
