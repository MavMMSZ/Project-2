import { Outlet } from 'react-router-dom'
import './App.css'
import './index.css'

import Header from './components/header'

import Footer from './components/footer'
import Navbar from './components/navbar'
import Snav from './components/Snav'



function App() {
  
  return (
    
  <div>
    <div >
        <Snav />
        <Navbar/>
      <main>
          <Header />
          <Outlet />
      </main>
    </div>

    <div>
      <Footer />
    </div>
  </div>
  )
}

export default App
