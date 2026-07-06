import axios from 'axios'

const API_KEY = import.meta.env.VITE_NYT_API_KEY
const BASE_URL = 'https://api.nytimes.com/svc'

export const getTopStories = async (section = 'home') => {
  const response = await axios.get(
    `${BASE_URL}/topstories/v2/${section}.json?api-key=${API_KEY}`
  )
  return response.data.results
}

export const getMostPopular = async () => {
  const response = await axios.get(
    `${BASE_URL}/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
  )
  return response.data.results
}
export const searchArticles = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`
  )
  return response.data.response.docs.map(doc => ({
    title: doc.headline.main,
    abstract: doc.abstract,
    url: doc.web_url,
    section: doc.section_name,
    multimedia: doc.multimedia?.length > 0 
      ? [{ url: `https://static01.nyt.com/${doc.multimedia[0].url}` }] 
      : []
  }))
}