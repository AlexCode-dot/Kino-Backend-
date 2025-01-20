import { loadMovie, loadMovies } from './src/fetchMovies.js';
import initApp from "./src/app.js";

const api = {
  loadMovie,
  loadMovies,
};

const app = initApp(api);
app.listen(5080);