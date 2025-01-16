import express from 'express'
import { engine } from 'express-handlebars'
import renderPage from './lib/renderPage.js'
import { loadMovie, loadMovies, filmExists } from "./lib/fetchMovies.js";


const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

app.get('/', async (request, response) => {
  try {
    const movies = await loadMovies();
    await renderPage(response, 'filmer', { movies })
  } catch (err) {
    response.status(500).send('Error loading filmer')
  }
})
 
app.get("/movies/:movieId", async (request, response) => {
  if (!(await filmExists(request.params.movieId))) {
    return response.status(404).render("404", {
      message: "Filmen kunde inte hittas",
    });
  }

  const movie = await loadMovie(request.params.movieId);
  await renderPage(response, 'film', { movie })
});

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
    response.status(500).send('Error loading omoss')
  }
})

app.get('/loggain', async (request, response) => {
  try {
    renderPage(response, 'loggain')
  } catch (err) {
    response.status(500).send('Error loading loggain')
  }
})

app.use('/static', express.static('./static'))

app.use((request, response) => {
  response.status(404).render('404', { message: 'Sidan finns inte' });
});

app.listen(5080)
