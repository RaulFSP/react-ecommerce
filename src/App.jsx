import { Route, Routes } from 'react-router'
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Checkout from "./pages/Checkout"
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/auth' element={<Auth />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
      </Routes>
    </div >
  )
}

export default App
