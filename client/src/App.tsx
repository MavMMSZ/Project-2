import { Outlet } from 'react-router-dom'
import './App.css'
import './index.css'

import Header from './components/header'
import Footer from './components/footer'
import Snav from './components/Snav'

function App() {
  return (

    <div>
      <div >
        <Header />
        <Snav />
        <main>
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
