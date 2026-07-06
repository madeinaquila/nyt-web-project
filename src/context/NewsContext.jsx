import { createContext, useContext, useState } from 'react'

const NewsContext = createContext()

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(false)
  const [section, setSection] = useState('home')
  const [darkMode, setDarkMode] = useState(false)

  return (
    <NewsContext.Provider value={{ articles, setArticles, popular, setPopular, loading, setLoading, section, setSection, darkMode, setDarkMode }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)