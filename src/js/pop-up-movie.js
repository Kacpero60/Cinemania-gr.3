// Funkcja do otwierania pop-upu
export async function openPopUp(movie, apikey) {
    const popUpContainer = document.getElementById('popUpContainer');
    const popUpImage = document.getElementById('popUpImage');
    const popUpDescription = document.getElementById('popUpDescription');

    // Clear previous content
    popUpImage.innerHTML = ''; // Clear any existing image
    popUpDescription.innerHTML = ''; // Clear any existing description

    // Create an img element for the movie poster
    const imgEl = document.createElement('img');
    imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    // Append the image to the pop-up image div
    popUpImage.appendChild(imgEl);

    // Fetch genres and map them
    const genreMap = await fetchGenres(apikey);
    const genreNames = movie.genre_ids.map(id => genreMap[id]).filter(name => name); // Map IDs to names

    popUpDescription.innerHTML = `
        <h2>${movie.title}</h2>
        <p class="pop-up-description-data vote" >Vote / Votes: <span> ${movie.vote_average} / ${movie.vote_count}</span></p>
        <p class="pop-up-description-data popularity">Popularity: <span>${movie.popularity}</span></p>
        <p class="pop-up-description-data gendre">Genre: <span>${genreNames.length > 0 ? genreNames.join(', ') : ''}</span></p>
        <p class="pop-up-description-data about"> ABOUT:</p>
        <p class="pop-up-description-data about-desc"> ${movie.overview}</p>
        <button class="buttonAddToMyLibrary" id="buttonAddToMyLibrary">Add to my</button>
    `;

    // Show the pop-up
    popUpContainer.style.display = 'flex';

    // Close pop-up event
    document.getElementById('closePopUp').onclick = function() {
        popUpContainer.style.display = 'none';
    };
}

// Funkcja do pobierania gatunków
export async function fetchGenres(apikey) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US&`);
        const data = await response.json();

        // Tworzenie mapy ID gatunków do nazw
        const genreMap = {};
        data.genres.forEach(genre => {
            genreMap[genre.id] = genre.name;
        });

        return genreMap;
    } catch (error) {
        console.error('Błąd podczas pobierania gatunków:', error);
        return {};
    }
}