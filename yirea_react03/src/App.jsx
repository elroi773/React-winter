import { Routes, Route } from 'react-router-dom'
import Nav from './components/common/Navi'
import Home from './components/Home'
import Userlist from './components/UserList'
import SimpleCounterPage from './pages/SimpleCounterPage'
import Timer from './components/Timer'

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/simplecounter" element={<SimpleCounterPage />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </div>
  )
}

export default App
