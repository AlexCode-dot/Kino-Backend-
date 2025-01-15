import express from 'express'
import { engine } from 'express-handlebars'
import renderPage from './lib/renderPage.js'
import { loadMovie, loadMovies } from "./lib/fetchMovies.js";

const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

app.get('/', async (request, response) => {
  try {
    const movies = await loadMovies();
    await renderPage(response, 'filmer', { movies })
  } catch (err) {
    response.status(500).send('Error loading filmer.html')
  }
})

app.get("/movies/:movieId", async (request, response) => {
  const movie = await loadMovie(request.params.movieId);
  await renderPage(response, 'film', { movie })
});

app.get('/barnbio', async (request, response) => {
  try {
    renderPage(response, 'barnbio')
  } catch (err) {
    response.status(500).send('Error loading barnbio.html')
  }
})

app.get('/evenemang', async (request, response) => {
  try {
    renderPage(response, 'evenemang')
  } catch (err) {
    response.status(500).send('Error loading evenemang.html')
  }
})

app.get('/omoss', async (request, response) => {
  try {
    renderPage(response, 'omoss')
  } catch (err) {
    response.status(500).send('Error loading omoss.html')
  }
})

app.get('/loggain', async (request, response) => {
  try {
    renderPage(response, 'loggain')
  } catch (err) {
    response.status(500).send('Error loading loggain.html')
  }
})

app.use('/static', express.static('./static'))

app.listen(5080)
