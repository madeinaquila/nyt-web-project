import { createContext, useContext, useState } from 'react'

const NewsContext = createContext()

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [section, setSection] = useState('home')

  return (
    <NewsContext.Provider value={{ articles, setArticles, loading, setLoading, section, setSection }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)