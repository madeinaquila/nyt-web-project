import { useNews } from '../context/NewsContext'

const sections = ['home', 'world', 'technology', 'science', 'health', 'travel', 'arts']

function Navbar() {
  const { section, setSection, setArticles } = useNews()

  const handleSection = (sec) => {
    setSection(sec)
    setArticles([])
  }

  return (
    <nav style={{
      borderBottom: '2px solid black',
      padding: '16px 0',
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      background: 'white',
      zIndex: 100
    }}>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', margin: '0 0 12px 0' }}>
        The New York Times
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {sections.map(sec => (
          <button
            key={sec}
            onClick={() => handleSection(sec)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: section === sec ? 'bold' : 'normal',
              textTransform: 'capitalize',
              borderBottom: section === sec ? '2px solid black' : 'none',
              paddingBottom: '4px'
            }}
          >
            {sec}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar