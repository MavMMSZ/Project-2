import { Outlet } from 'react-router-dom'
import './App.css'
import './index.css'

import Header from './components/header'
import Footer from './components/footer'
import Snav from './components/Snav'

function App() {
  return (
    <div>
      <Header />
      <Snav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
