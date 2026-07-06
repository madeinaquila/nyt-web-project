import { useEffect } from 'react'
import { getTopStories } from '../services/api'
import { useNews } from '../context/NewsContext'
import Navbar from '../components/Navbar'

function HomePage() {
  const { articles, setArticles, loading, setLoading, section } = useNews()

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const data = await getTopStories(section)
        setArticles(data)
      } catch (error) {
        console.error('Errore:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [section])

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        {loading && <p>Caricamento...</p>}
        {articles.slice(0, 10).map((article, index) => (
          <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '20px 0' }}>
            {article.multimedia?.[0] && (
              <img
                src={article.multimedia[0].url}
                alt={article.title}
                style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '12px' }}
              />
            )}
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{article.title}</h2>
            <p style={{ color: '#555', marginBottom: '8px' }}>{article.abstract}</p>
            <a href={article.url} target="_blank" rel="noreferrer"
              style={{ color: 'black', fontWeight: 'bold' }}>
              Leggi tutto →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage