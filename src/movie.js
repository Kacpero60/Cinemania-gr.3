const apikey = '26ee83a5e26d7fcb87f8d8380af6bd82';

//funkcja pobierająca filmy z TMdb
async function Movies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('response was not ok')
        }
        const data = await response.json();
         return data.results;

    } catch (error) {
        console.error('Error when fetching data:', error);
    }
}

//url dla różnych kategorii
const trendingToday = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
const trendingThisWeek = `https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`;
const newMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;

//funckja do pobierania filmów
async function fetchMovies(url) {
    const movies = await Movies(url);
    if (movies) {
        
        //intuicyjne wyszukiwanie filmów poprzez ich id = teraz tytuły
        const movieWithTitleAsId = movies.map(movie => ({
            id: movie.id,
            titleId: movie.title.toLowerCase(),
            title: movie.title,
        }))
        console.log(movies);
    }
}


//wywoływanie funkcji dla różnych url-i
fetchMovies(trendingToday); 
fetchMovies(trendingThisWeek); 
fetchMovies(newMovies); 