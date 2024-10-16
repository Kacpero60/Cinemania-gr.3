const heroTitle = document.querySelector('.title');
const heroDescription = document.querySelector('.text');
const watchTrailerBtn = document.querySelector('.hero-btn.cta');
const moreDetailsBtn = document.querySelector('.hero-btn.more-details');
const heroSection = document.querySelector('.hero.container');
const intro = document.querySelector('.intro');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGFmNjM2ZDFlODkyMDExOWQzMTQzY2RmNzBhN2YwMyIsIm5iZiI6MTcyODYzMTgwMy45MTE0MTcsInN1YiI6IjY3MDhkMjQ0ZDM1N2EyMTAzOTk2YjFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5uM4DtVyZACf3caezHHrJ_7jiOROWxJUJYqRS0RLCPE',
  },
};

// Funkcja pobierająca dane z API i losująca film
const fetchRandomMovie = async () => {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      options
    );
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      // Losujemy film z dostępnych wyników
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];

      // Aktualizujemy tytuł, opis i obrazek w hero
      heroTitle.textContent = randomMovie.title || 'Unknown Title';
      heroDescription.textContent =
        randomMovie.overview || 'No description available for this movie.';
      moreDetailsBtn.style.display = 'block';
      const backgroundImageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
      heroSection.style.backgroundImage = `
          linear-gradient(83deg, #111 36.85%, rgba(17, 17, 17, 0) 60.05%), 
          url(${backgroundImageUrl})
        `;
      heroSection.style.backgroundSize = 'cover';
      heroSection.style.backgroundPosition = 'center';
    } else {
      setDefaultHero(); // Jeśli brak wyników, ustawiamy domyślny wygląd
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
    setDefaultHero(); // Jeśli wystąpił błąd, ustawiamy domyślny wygląd
  }
};

// Funkcja ustawiająca domyślny wygląd sekcji hero
const setDefaultHero = () => {
  heroTitle.textContent = "Let's Make Your Own Cinema";
  heroDescription.textContent =
    "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";
  watchTrailerBtn.textContent = 'Get started';
  moreDetailsBtn.style.display = 'none';
};

// Wywołanie funkcji pobierającej dane
fetchRandomMovie();
