import { expect, test } from '@jest/globals';
import request from 'supertest';
import initApp from '../src/app.js';

test('Verify that movie pages display the correct title', async () => {
    const mockLoadMovies = async () => [];
    const mockLoadMovie = async (id) => {
        if (id === '1') {
            return { 
                id: 1, 
                title: 'Encanto' };
        }
        if (id === '2') {
            return { 
                id: 2, 
                title: 'Forrest Gump' };
        }
        return null;
    };

    const api = {
        loadMovies: mockLoadMovies,
        loadMovie: mockLoadMovie,
    };

    const app = initApp(api);

    const response = await request(app)
        .get('/movies/1')
        .expect('Content-Type', /html/)
        .expect(200);

    expect(response.text).toMatch('Encanto');

    const movieResponse2 = await request(app)
    .get('/movies/2')
    .expect('Content-Type', /html/)
    .expect(200);
    expect(movieResponse2.text).toMatch('Forrest Gump');
});

test('Verify that a non-existing movie page returns a 404 error and with the correct message', async () => {
    const api = {
        loadMovies: async () => [],
        loadMovie: async () => null
    };

    const app = initApp(api);

    const notFoundResponse = await request(app)
        .get('/movies/x')
        .expect('Content-Type', /html/)
        .expect(404);

    expect(notFoundResponse.text).toMatch('Filmen kunde inte hittas');
});

test('Verify that any non-existing route returns a 404 error with the correct message', async () => {
    const mockApi = {
        loadMovies: async () => [],
        loadMovie: async () => null,
    };

    const app = initApp(mockApi);

    const notFoundResponse = await request(app)
        .get('/invalid-route') 
        .expect('Content-Type', /html/)
        .expect(404);

    expect(notFoundResponse.text).toMatch('Sidan finns inte');
});

      