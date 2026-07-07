import { Routes, Route } from 'react-router-dom'
import { useNews } from './context/NewsContext'
import HomePage from './pages/HomePage'

function App() {
  const { darkMode } = useNews()

  document.body.style.backgroundColor = darkMode ? '#121212' : 'white'

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App