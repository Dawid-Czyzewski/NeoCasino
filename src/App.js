import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import './i18n'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import RoulettePage from './pages/RoulettePage'
import CrashPage from './pages/CrashPage'
import ScratchPage from './pages/ScratchPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="game/:gameId" element={<GamePage />} />
          <Route path="roulette" element={<RoulettePage />} />
          <Route path="crash" element={<CrashPage />} />
          <Route path="scratch" element={<ScratchPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
