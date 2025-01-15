import fetch from "node-fetch";

export async function loadMovies() {
  const res = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
  const payload = await res.json();
  return payload.data;
}

export async function loadMovie(id) {
  const res = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies/' + id);
  const payload = await res.json();
  return payload.data;
}