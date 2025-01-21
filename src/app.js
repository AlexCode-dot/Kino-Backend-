import express from 'express'
import ejsMate from 'ejs-mate'
import renderPage from './renderPage.js'
import { filmExists } from './fetchMovies.js'

export default function initApp(api) {
  const app = express()

  app.engine('ejs', ejsMate)
  app.set('view engine', 'ejs')
  app.set('views', './templates')

  app.get('/', async (request, response) => {
    try {
      const movies = await api.loadMovies()
      await renderPage(response, 'filmer', { movies })
    } catch (err) {
      response.status(500).send('Error loading filmer')
    }
  })

  app.get('/movies/:movieId', async (request, response) => {
    try {
      const movieId = request.params.movieId
      if (!(await filmExists(movieId))) {
        response.status(404)
        return renderPage(response, '404', {
          message: 'Filmen kunde inte hittas',
        })
      }

      const movie = await api.loadMovie(movieId)
      await renderPage(response, 'film', { movie })
    } catch (err) {
      console.error(`Error loading movie with ID ${request.params.movieId}:`, err)
      response.status(500).send('Error loading the movie')
    }
  })

  app.get('/barnbio', async (request, response) => {
    try {
      renderPage(response, 'barnbio')
    } catch (err) {
      response.status(500).send('Error loading barnbio')
    }
  })

  app.get('/evenemang', async (request, response) => {
    try {
      renderPage(response, 'evenemang')
    } catch (err) {
      response.status(500).send('Error loading evenemang')
    }
  })

  app.get('/omoss', async (request, response) => {
    try {
      renderPage(response, 'omoss')
    } catch (err) {
      response.status(500).send('Error loading om oss')
    }
  })

  app.get('/loggain', async (request, response) => {
    try {
      renderPage(response, 'loggain')
    } catch (err) {
      response.status(500).send('Error loading logga in')
    }
  })

  app.use('/static', express.static('./static'))

  app.use((request, response) => {
    response.status(404)
    renderPage(response, '404', { message: 'Sidan finns inte' })
  })

  return app
}
