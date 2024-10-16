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
  moreDetailsBtn.style.display = 'none';
};

// Wywołanie funkcji pobierającej dane
fetchRandomMovie();
