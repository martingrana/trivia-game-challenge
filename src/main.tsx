import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/reset.scss"
import './index.scss'
import App from './App.tsx'
import { GameProvider } from './contexts/GameProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>,
)
