       // Funkcja do pobierania gatunków filmów z TMDB
       async function fetchGenres() {
        const apiKey = '26ee83a5e26d7fcb87f8d8380af6bd82' ; // Podaj swój klucz API
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching genres from TMDB');
            }
            const data = await response.json();

            const genreSelect = document.getElementById('genreSelect');

            // Dodanie opcji do selecta
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

    // Funkcja do wyświetlania filmów z localStorage
    function displayMovies() {
        const galleryLibrary = document.querySelector('.gallery-library');
        const message = document.querySelector('.message');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        // Pobieranie filmów z localStorage
        const movies = JSON.parse(localStorage.getItem('myLibrary')) || [];

        // Sprawdzenie, czy są filmy w bibliotece
        if (movies.length === 0) {
            message.style.display = 'block'; 
            loadMoreBtn.style.display = 'none'; 
            galleryLibrary.innerHTML = ''; 
            return;
        } else {
            message.style.display = 'none'; 
            loadMoreBtn.style.display = 'block'; 
        }

        // Wyświetlanie filmów
        galleryLibrary.innerHTML = ''; 
        movies.forEach(movie => {
            const movieEl = document.createElement('div');
            movieEl.className = 'movie-item'; 

            const imgEl = document.createElement('img');
            imgEl.src = movie.posterPath; 
            imgEl.alt = movie.title; 

            const titleEl = document.createElement('p');
            titleEl.textContent = movie.title; 

            movieEl.appendChild(imgEl);
            movieEl.appendChild(titleEl);
            galleryLibrary.appendChild(movieEl);
        });
    }

    // Wywołanie funkcji podczas ładowania strony
    document.addEventListener('DOMContentLoaded', async () => {
        await fetchGenres(); 
        displayMovies(); 
    });
    // Funkcja do wyświetlania filmów w zakładce 'My Library'
function displayLibrary() {
    const library = JSON.parse(localStorage.getItem('library')) || [];
    const gallery = document.querySelector('.gallery-library');
    const message = document.querySelector('.message');

    if (library.length === 0) {
        message.style.display = 'block';
        gallery.innerHTML = '';  // Wyczyść galerię
    } else {
        message.style.display = 'none';
        gallery.innerHTML = '';  // Wyczyść galerię na wypadek ponownego załadowania
        library.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-item');
            movieElement.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <button class="show-details-btn">Show Details</button>
            `;
            gallery.appendChild(movieElement);

            // Dodaj pop-up do każdego filmu
            movieElement.querySelector('.show-details-btn').addEventListener('click', () => {
                openPopUp(movie);
            });
        });
    }
}

// Funkcja otwierająca pop-up
function openPopUp(movie) {
    const popUp = document.createElement('div');
    popUp.classList.add('popup');
    popUp.innerHTML = `
        <div class="popup-content">
            <h2>${movie.title}</h2>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Description:</strong> ${movie.description || 'No description available'}</p>
            <button class="close-popup-btn">Close</button>
        </div>
    `;

    document.body.appendChild(popUp);

    // Funkcja zamykająca pop-up
    popUp.querySelector('.close-popup-btn').addEventListener('click', () => {
        popUp.remove();
    });
}

document.addEventListener('DOMContentLoaded', displayLibrary);
