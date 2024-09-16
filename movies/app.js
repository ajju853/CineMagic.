const apiUrl = 'https://freetestapi.com/api/v1/movies';
let movies = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
    setupEventListeners();
});

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        movies = await response.json();
        renderMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function renderMovies(moviesToRender) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';

    moviesToRender.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-rating"><i class="fas fa-star"></i> ${movie.rating}</p>
            </div>
        `;
        movieCard.addEventListener('click', () => showMovieDetails(movie));
        movieGrid.appendChild(movieCard);
    });
}

function showMovieDetails(movie) {
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.innerHTML = `
        <div class="movie-poster">
            <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <div class="movie-info-details">
            <h2>${movie.title} (${movie.year})</h2>
            <p><strong>Rating:</strong> ${movie.rating} <i class="fas fa-star" style="color: #f5c518;"></i></p>
            <p><strong>Genre:</strong> ${movie.genre.join(', ')}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Actors:</strong> ${movie.actors.join(', ')}</p>
            <p><strong>Plot:</strong> ${movie.plot}</p>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p><strong>Awards:</strong> ${movie.awards}</p>
            <p><strong>Box Office:</strong> ${movie.boxOffice}</p>
        </div>
    `;
    document.getElementById('movie-modal').style.display = 'block';
}

function setupEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const genre = e.target.getAttribute('data-genre');
            filterMovies(genre);
        });
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('movie-modal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('movie-modal')) {
            document.getElementById('movie-modal').style.display = 'none';
        }
    });
}

function filterMovies(genre) {
    let filteredMovies = movies;
    if (genre !== 'all') {
        filteredMovies = movies.filter(movie => movie.genre.includes(genre));
    }
    renderMovies(filteredMovies);
}