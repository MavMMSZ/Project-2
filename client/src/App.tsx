import { Outlet } from 'react-router-dom'
import './App.css'
import './index.css'

import Header from './components/header'
import Carousel from './components/carousel'
import Footer from './components/footer'
import Navbar from './components/navbar'
import Snav from './components/Snav'



function App() {
  
  return (
    <div className="App">
      <Header />
      <Carousel />
      <Snav />
      <Navbar />
      <main>
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
