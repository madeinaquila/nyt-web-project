import { useEffect } from 'react'
import { getTopStories, getMostPopular } from '../services/api'
import { useNews } from '../context/NewsContext'
import Navbar from '../components/Navbar'

const FALLBACK_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_York_Times_logo_variation.jpg/320px-New_York_Times_logo_variation.jpg'

function HomePage() {
  const { articles, setArticles, popular, setPopular, loading, setLoading, section, darkMode } = useNews()

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

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getMostPopular()
        setPopular(data)
      } catch (error) {
        console.error('Errore popular:', error)
      }
    }
    fetchPopular()
  }, [])

  const validArticles = articles.filter(a => a.title && a.title !== '')
  const hero = validArticles[0]
  const rest = validArticles.slice(1, 10)

  const bg = darkMode ? '#121212' : 'white'
  const text = darkMode ? 'white' : 'black'
  const subtext = darkMode ? '#aaa' : '#555'
  const border = darkMode ? '#444' : '#ddd'

  return (
    <div style={{ background: bg, minHeight: '100vh', color: text }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

        {/* COLONNA SINISTRA */}
        <div>
          {loading && <p>Caricamento...</p>}

          {hero && (
            <div style={{ marginBottom: '40px', borderBottom: `2px solid ${text}`, paddingBottom: '30px' }}>
              <img
                src={hero.multimedia?.[0]?.url || FALLBACK_IMG}
                alt={hero.title}
                style={{ width: '100%', height: '400px', objectFit: 'cover', marginBottom: '20px' }}
              />
              <p style={{ fontSize: '12px', textTransform: 'uppercase', color: subtext, marginBottom: '8px' }}>
                {hero.section}
              </p>
              <h1 style={{ fontSize: '2rem', lineHeight: '1.3', marginBottom: '12px', fontFamily: 'Georgia, serif', color: text }}>
                {hero.title}
              </h1>
              <p style={{ fontSize: '1rem', color: subtext, marginBottom: '16px', lineHeight: '1.6' }}>
                {hero.abstract}
              </p>
              <a href={hero.url} target="_blank" rel="noreferrer"
                style={{ color: text, fontWeight: 'bold', fontSize: '14px' }}>
                Leggi tutto →
              </a>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {rest.map((article, index) => (
              <div key={index} style={{ borderBottom: `1px solid ${border}`, paddingBottom: '20px' }}>
                <img
                  src={article.multimedia?.[0]?.url || FALLBACK_IMG}
                  alt={article.title}
                  style={{ width: '100%', height: '160px', objectFit: 'cover', marginBottom: '10px' }}
                />
                <p style={{ fontSize: '11px', textTransform: 'uppercase', color: subtext, marginBottom: '4px' }}>
                  {article.section}
                </p>
                <h2 style={{ fontSize: '1rem', marginBottom: '8px', fontFamily: 'Georgia, serif', lineHeight: '1.4', color: text }}>
                  {article.title}
                </h2>
                <a href={article.url} target="_blank" rel="noreferrer"
                  style={{ color: text, fontWeight: 'bold', fontSize: '13px' }}>
                  Leggi tutto →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR MOST POPULAR */}
        <div style={{ borderLeft: `1px solid ${border}`, paddingLeft: '30px' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', borderBottom: `2px solid ${text}`, paddingBottom: '8px', marginBottom: '16px', color: text }}>
            Most Popular
          </h3>
          {popular.slice(0, 8).map((article, index) => (
            <div key={index} style={{ borderBottom: `1px solid ${border}`, paddingBottom: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: border, display: 'block', marginBottom: '4px' }}>
                {index + 1}
              </span>
              <a href={article.url} target="_blank" rel="noreferrer"
                style={{ color: text, textDecoration: 'none', fontFamily: 'Georgia, serif', fontSize: '14px', lineHeight: '1.4' }}>
                {article.title}
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default HomePage