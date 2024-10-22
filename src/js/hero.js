const heroTitle = document.querySelector('.title');
const heroDescription = document.querySelector('.text');
const watchTrailerBtn = document.querySelector('.hero-btn.cta');
const moreDetailsBtn = document.querySelector('.hero-btn.more-details');
const heroSection = document.querySelector('.hero.container');
const intro = document.querySelector('.intro');

// Funkcja pobierająca dane z API i losująca film
const fetchRandomMovie = async () => {
  const apiKey = '9daf636d1e8920119d3143cdf70a7f03';
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('response was not ok');
    }

    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      // Losujemy film z dostępnych wyników
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];

      // Aktualizujemy tytuł, opis i obrazek w hero
      heroTitle.textContent = randomMovie.title || 'Unknown Title';
      heroDescription.textContent =
        randomMovie.overview || 'No description available for this movie.';

      addEllipsis();

      moreDetailsBtn.style.display = 'block';

      const backgroundImageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;

      setBackgroundImage(backgroundImageUrl);

      //Dodawanie trailera:
      const trailerUrl = `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${apiKey}&language=en-US`;
      const trailerResponse = await fetch(trailerUrl);
      const trailerData = await trailerResponse.json();

      if (trailerData.results.length > 0) {
        const trailer = trailerData.results.find(
          video => video.type === 'Trailer'
        );
        if (trailer) {
          const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}`;
          watchTrailerBtn.onclick = () => openTrailerModal(youtubeUrl);
        } else {
          // Brak zwiastuna
          watchTrailerBtn.onclick = () => openTrailerModal(null);
        }
      } else {
        // Brak zwiastuna
        watchTrailerBtn.onclick = () => openTrailerModal(null);
      }
    } else {
      setDefaultHero(); // Jeśli brak wyników, ustawiamy domyślny wygląd
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
    setDefaultHero(); // Jeśli wystąpił błąd, ustawiamy domyślny wygląd
  }
};

const setBackgroundImage = imageUrl => {
  heroSection.style.backgroundImage = `
    linear-gradient(83deg, #111 36.85%, rgba(17, 17, 17, 0) 60.05%), 
    url(${imageUrl})
  `;
};

//Funckja dodająca trzykropek w opisie w przypadku dłuższego tekstu
const addEllipsis = () => {
  const originalText = heroDescription.innerText;
  let text = originalText;

  while (heroDescription.scrollHeight > heroDescription.clientHeight) {
    text = text.slice(0, -1);
    heroDescription.innerText = text + '...';
  }
};

// Funkcja ustawiająca domyślny wygląd sekcji hero
const setDefaultHero = () => {
  heroTitle.textContent = "Let's Make Your Own Cinema";
  heroDescription.textContent =
    "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";
  heroDescription.style.height = 'auto';
  watchTrailerBtn.textContent = 'Get started';
  watchTrailerBtn.onclick = () => {
    window.location.href = 'partials/catalog.html';
  };
  moreDetailsBtn.style.display = 'none';
};

// Funckcja otwierajaca modal z trailerem
const openTrailerModal = trailerUrl => {
  const trailerModal = document.querySelector('.trailerModal');
  const trailerFrame = document.getElementById('trailerFrame');

  if (trailerUrl) {
    trailerFrame.src = trailerUrl;
    trailerFrame.style.display = 'block'; // Pokaż wideo
  } else {
    trailerFrame.style.display = 'none'; // Ukryj wideo

    // Dodaj komunikat o braku zwiastuna, jeśli nie istnieje
    if (!document.querySelector('.no-trailer-content')) {
      document.querySelector('.trailer-modal-content').innerHTML += `
        <div class="no-trailer-content">
          <p class="no-trailer">OOPS... We are very sorry, but we couldn't find the trailer!</p>
          <img src="../images/NoTrailer.png" alt="No trailer available" class="no-trailer-img" />
        </div>
      `;
    }
  }
  trailerModal.style.display = 'flex';
};

// Zamykanie modala z trailerem
const closeTrailerModal = () => {
  const trailerModal = document.querySelector('.trailerModal');
  const trailerFrame = document.getElementById('trailerFrame');

  trailerFrame.src = ''; // Czyści źródło wideo po zamknięciu modala
  trailerModal.style.display = 'none';

  // Usuwamy komunikat o braku zwiastuna i obrazek (jeśli istnieją)
  const noTrailerContent = document.querySelector('.no-trailer-content');
  if (noTrailerContent) {
    noTrailerContent.remove();
  }
};

// Obsługa zamykania modala po kliknięciu "x" lub poza modalem
document.querySelector('.close').addEventListener('click', closeTrailerModal);
window.addEventListener('click', event => {
  const trailerModal = document.querySelector('.trailerModal');
  if (event.target === trailerModal) {
    closeTrailerModal();
  }
});
// Wywołanie funkcji pobierającej dane
fetchRandomMovie();
