import { Outlet } from 'react-router-dom'
import { useGame } from '../hooks/useGame'
import Header from '../components/Header'

const MainLayout = () => {
  const gameState = useGame()

  return (
    <div className="casino-app">
      <Header 
        wallet={gameState.wallet}
        isSpinning={gameState.isSpinning}
      />
      <main className="main-content">
        <Outlet context={gameState} />
      </main>
    </div>
  )
}

export default MainLayout
