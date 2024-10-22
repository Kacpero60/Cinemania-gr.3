// Funkcja do otwierania pop-upu
export async function openPopUp(movie, apikey) {
  const popUpContainer = document.getElementById('popUpContainer');
  const popUpImage = document.getElementById('popUpImage');
  const popUpDescription = document.getElementById('popUpDescription');

  // Wyczyść poprzednią zawartość
  popUpImage.innerHTML = ''; // Wyczyść poprzednie zdjęcie
  popUpDescription.innerHTML = ''; // Wyczyść poprzedni opis

  // Tworzenie elementu img dla plakatu filmu
  const imgEl = document.createElement('img');
  imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  popUpImage.appendChild(imgEl);

  // Pobierz gatunki filmów i mapuj je
  const genreMap = await fetchGenres(apikey);
  const genreNames = movie.genre_ids
    .map(id => genreMap[id])
    .filter(name => name); // Mapowanie ID do nazw

  // Sprawdzenie, czy film jest już w bibliotece
  const library = JSON.parse(localStorage.getItem('library')) || [];
  const isInLibrary = library.some(item => item.id === movie.id);

  // Wyświetlanie szczegółów filmu w pop-upie
  popUpDescription.innerHTML = `
        <h2>${movie.title}</h2>
        <p class="pop-up-description-data vote">Vote / Votes: <span class="vote-span">${
          movie.vote_average
        }</span> / <span class="votes-span">${movie.vote_count}</span></p>
        <p class="pop-up-description-data popularity">Popularity: <span class="popularity-span">${
          movie.popularity
        }</span></p>
        <p class="pop-up-description-data gendre">Genre: <span class="gendre-span">${
          genreNames.length > 0 ? genreNames.join(', ') : 'Unknown'
        }</span></p>
        <p class="pop-up-description-data about">ABOUT:</p>
        <p class="pop-up-description-data about-desc">${movie.overview}</p>
        <div class="gradient-box"><button class="buttonAddToMyLibrary" id="buttonAddToMyLibrary">${isInLibrary ? 'Remove from my library' : 'Add to my library'}</button></div>
    `;

  // Pokaż pop-up
  popUpContainer.style.display = 'flex';

  // Zamknięcie pop-upu
  document.getElementById('closePopUp').onclick = function () {
    popUpContainer.style.display = 'none';
  };

  // Obsługa kliknięcia przycisku "Add to my library"
  const addToLibraryButton = document.getElementById('buttonAddToMyLibrary');
  addToLibraryButton.onclick = function () {
    addToLibrary(movie);

    // Zaktualizuj tekst przycisku po kliknięciu
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
    // Film nie istnieje, dodaj go do biblioteki
    library.push(movie);
    alert(`${movie.title} został dodany do Twojej biblioteki!`);
  } else {
    // Film już istnieje, usuń go z biblioteki
    library.splice(existingMovieIndex, 1);
    alert(`${movie.title} został usunięty z Twojej biblioteki!`);
  }

  // Zapisz zaktualizowaną bibliotekę w localStorage
  localStorage.setItem('library', JSON.stringify(library));
}
