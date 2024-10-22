// Funkcja do otwierania pop-upu
export async function openPopUp(movie, apikey) {
    const popUpContainer = document.getElementById('popUpContainer');
    const popUpImage = document.getElementById('popUpImage');
    const popUpDescription = document.getElementById('popUpDescription');
  
    // Wyczyść poprzednią zawartość
    popUpImage.innerHTML = '';
    popUpDescription.innerHTML = '';
  
    // Tworzenie elementu img dla plakatu filmu
    const imgEl = document.createElement('img');
    imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    popUpImage.appendChild(imgEl);
  
    // Pobierz gatunki filmów
    const genreMap = await fetchGenres(apikey);
    const genreNames = movie.genre_ids.map(id => genreMap[id]).filter(name => name); // Mapowanie ID do nazw
  
    // Sprawdzenie, czy film jest już w bibliotece
    const library = JSON.parse(localStorage.getItem('library')) || [];
    const isInLibrary = library.some(item => item.id === movie.id);
  
    popUpDescription.innerHTML = `
        <h2>${movie.title}</h2>
        <p class="pop-up-description-data vote">Vote / Votes: <span>${movie.vote_average} / ${movie.vote_count}</span></p>
        <p class="pop-up-description-data popularity">Popularity: <span>${movie.popularity}</span></p>
        <p class="pop-up-description-data genre">Genre: <span>${genreNames.length > 0 ? genreNames.join(', ') : ''}</span></p>
        <p class="pop-up-description-data about">ABOUT:</p>
        <p class="pop-up-description-data about-desc">${movie.overview}</p>
        <button class="buttonAddToMyLibrary" id="buttonAddToMyLibrary">${isInLibrary ? 'Remove from my library' : 'Add to my library'}</button>
    `;
  
    // Pokaż pop-up
    popUpContainer.style.display = 'flex';
  
    // Zamknij pop-up po kliknięciu przycisku zamknięcia
    document.getElementById('closePopUp').onclick = function () {
      popUpContainer.style.display = 'none';
    };
  
    // Obsługa kliknięcia przycisku "Add to my library"
    const addToLibraryButton = document.getElementById('buttonAddToMyLibrary');
    addToLibraryButton.onclick = function() {
        addToLibrary(movie);
        // Zaktualizuj tekst przycisku
        const updatedLibrary = JSON.parse(localStorage.getItem('library')) || [];
        const isNowInLibrary = updatedLibrary.some(item => item.id === movie.id);
        this.textContent = isNowInLibrary ? 'Remove from my library' : 'Add to my library';
    };
}

// Funkcja do pobierania gatunków
export async function fetchGenres(apikey) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
      );
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

// Funkcja dodająca/odejmująca film z biblioteki
function addToLibrary(movie) {
    let library = JSON.parse(localStorage.getItem('library')) || [];
    
    // Sprawdzenie, czy film już istnieje w bibliotece
    const existingMovieIndex = library.findIndex(item => item.id === movie.id);
    
    if (existingMovieIndex === -1) {
        // Film nie istnieje, dodaj go
        library.push(movie);
        alert(`${movie.title} został dodany do Twojej biblioteki!`);
    } else {
        // Film już istnieje, usuń go
        library.splice(existingMovieIndex, 1);
        alert(`${movie.title} został usunięty z Twojej biblioteki!`);
    }
    
    // Zapisz zaktualizowaną bibliotekę w localStorage
    localStorage.setItem('library', JSON.stringify(library));
}
