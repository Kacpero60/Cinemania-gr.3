// Funkcja do pobierania gatunków filmów z TMDB
async function fetchGenres() {
    const apiKey = '26ee83a5e26d7fcb87f8d8380af6bd82';
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching genres from TMDB');
        }
        const data = await response.json();
        const genreSelect = document.getElementById('genreSelect');

        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Funkcja do wyświetlania filmów w bibliotece
function displayMovies() {
    const galleryLibrary = document.querySelector('.gallery-library');
    const message = document.querySelector('.message');

    const movies = JSON.parse(localStorage.getItem('myLibrary')) || [];
    if (movies.length === 0) {
        message.style.display = 'block';
        galleryLibrary.innerHTML = '';
        return;
    } else {
        message.style.display = 'none';
    }

    galleryLibrary.innerHTML = '';
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie-item';

        const imgEl = document.createElement('img');
        imgEl.src = `https://image.tmdb.org/t/p/w500${movie.posterPath}`; // Upewnij się, że jest poprawny URL
        imgEl.alt = movie.title;

        const titleEl = document.createElement('h3');
        titleEl.textContent = movie.title;

        // Możesz dodać inne informacje o filmie, jeśli chcesz
        const genreEl = document.createElement('p');
        genreEl.textContent = `Genre: ${movie.genre}`;

        movieEl.appendChild(imgEl);
        movieEl.appendChild(titleEl);
        movieEl.appendChild(genreEl);
        galleryLibrary.appendChild(movieEl);
    });
}

// Wywołanie funkcji podczas ładowania strony
document.addEventListener('DOMContentLoaded', async () => {
    await fetchGenres();
    displayMovies();
});

// Funkcja do wyświetlania biblioteki (można usunąć, ponieważ jest zintegrowana z displayMovies)
function displayLibrary() {
    // Funkcjonalność jest teraz zintegrowana w displayMovies, więc można usunąć tę funkcję
}

// Dodatkowa funkcja do dodawania filmów do biblioteki
function addToLibrary(movie) {
    let library = JSON.parse(localStorage.getItem('myLibrary')) || [];

    // Sprawdzamy, czy film już istnieje w bibliotece
    const movieExists = library.some(item => item.title === movie.title);
    if (!movieExists) {
        library.push(movie); 
        localStorage.setItem('myLibrary', JSON.stringify(library)); 
        displayMovies(); 
        alert(`${movie.title} został dodany do Twojej biblioteki!`);
    } else {
        alert(`${movie.title} już znajduje się w Twojej bibliotece!`);
    }
}
