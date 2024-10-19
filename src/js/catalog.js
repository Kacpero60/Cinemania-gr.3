import { openPopUp } from './pop-up.js'; // Importuj funkcje z pop-up.js

const apikey = '26ee83a5e26d7fcb87f8d8380af6bd82';
const gallery = document.querySelector(".gallery");
let currentPage = 1;
let totalPages = 24;
const perPage = 20;
let keyWord = '';
let selectedCountry = '';
let selectedYear = '';

// funkcja do wyboru krajów
async function selector() {
    const countrySelect = document.getElementById('countrySelect');

    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const countries = await response.json();

        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            const option = document.createElement('option');
            option.value = country.cca2;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        }
    } catch (error) {
        console.error('Błąd podczas pobierania krajów:', error);
    }
}

// funkcja do wyboru lat
async function populateYears() {
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1980; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// renderowanie przycisków paginacji
async function renderBtn() {
    const paginationBtn = document.getElementById('pagination');
    paginationBtn.innerHTML = '';

    // przycisk do cofania
    if (currentPage >= 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '<';
        prevBtn.classList.add('prevnext-btn');

        prevBtn.addEventListener('click', () => {
            currentPage--;
            keyWord ? searchMovies(keyWord, currentPage) : popularMovies(currentPage);
            renderBtn();
        });
        paginationBtn.appendChild(prevBtn);
    }

    // wyświetlanie pierwszych trzech stron
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('pagination-btn');

        if (i === currentPage) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            currentPage = i;
            keyWord ? searchMovies(keyWord, currentPage) : popularMovies(currentPage);
            renderBtn();
        });
        paginationBtn.appendChild(btn);
    }

    // kropki, jeśli jest więcej niż 3 strony
    if (totalPages > 3) {
        const dots = document.createElement('div');
        dots.textContent = '...';
        paginationBtn.appendChild(dots);
        dots.classList.add('dots');

        // wyświetlenie ostatniej strony
        const lastBtn = document.createElement('button');
        lastBtn.textContent = 24;
        lastBtn.classList.add('pagination-btn');

        lastBtn.addEventListener('click', () => {
            currentPage = 24;
            keyWord ? searchMovies(keyWord, currentPage) : popularMovies(currentPage);
            renderBtn();
        });
        paginationBtn.appendChild(lastBtn);
    }

    // przycisk do następnej strony
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>';
        nextBtn.classList.add('prevnext-btn');

        nextBtn.addEventListener('click', () => {
            currentPage++;
            keyWord ? searchMovies(keyWord, currentPage) : popularMovies(currentPage);
            renderBtn();
        });
        paginationBtn.appendChild(nextBtn);
    }
}

// pobieranie popularnych filmów
async function popularMovies(page = 1) {
    const regionParams = selectedCountry ? `&region=${selectedCountry}` : '';
    const yearParams = selectedYear ? `&primary_release_year=${selectedYear}` : '';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&include_adult=false&page=${page}${regionParams}${yearParams}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('response was not ok');
        }
        const data = await response.json();
        totalPages = data.total_pages;
        gallery.innerHTML = '';

        if (data.results.length > 0) {
            data.results.forEach(movie => {
                const movieEl = document.createElement('div');
                movieEl.className = 'movie';

                const imgEl = document.createElement('img');
                imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

                const titleEl = document.createElement('p');
                titleEl.textContent = movie.title;
                titleEl.className = 'movie-title';

                movieEl.appendChild(imgEl);
                movieEl.appendChild(titleEl);
                gallery.appendChild(movieEl);

                movieEl.addEventListener("click", () => {
                    openPopUp(movie, apikey);
                });
            });
        } else {
            gallery.textContent = 'OOPS... Brak wyników pasujących do wyszukiwania.';
        }

        renderBtn();
    } catch (error) {
        console.error('Błąd podczas pobierania filmów:', error);
    }
}

// wyszukiwanie filmów po wpisaniu frazy
async function searchMovies(keyWord, page = 1) {
    const yearParams = selectedYear ? `&primary_release_year=${selectedYear}` : '';
    const regionParams = selectedCountry ? `&region=${selectedCountry}` : '';
    const apiURL = `https://api.themoviedb.org/3/search/movie?query=${keyWord}&api_key=${apikey}&language=en-US&include_adult=false&page=${page}${regionParams}${yearParams}`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('response was not ok');
        }
        const data = await response.json();
        totalPages = data.total_pages;
        gallery.innerHTML = '';

        if (data.results.length > 0) {
            for (const movie of data.results) {
                const movieEl = document.createElement('div');
                movieEl.className = 'movie';

                const imgEl = document.createElement('img');
                imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

                const titleEl = document.createElement('p');
                titleEl.textContent = movie.title;
                titleEl.className = 'movie-title';

                movieEl.appendChild(imgEl);
                movieEl.appendChild(titleEl);
                gallery.appendChild(movieEl);
            }
        } else {
            gallery.textContent = 'OOPS... Brak wyników pasujących do wyszukiwania.';
        }

        renderBtn();
    } catch (error) {
        console.error('Błąd podczas wyszukiwania filmów:', error);
    }
}

// wyszukiwanie po kliknięciu przycisku
document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();

    keyWord = document.getElementById('searchInput').value;
    selectedYear = document.getElementById('yearSelect').value;
    selectedCountry = document.getElementById('countrySelect').value;

    if (keyWord === "") {
        return;
    }

    currentPage = 1;
    searchMovies(keyWord);
});

// ładowanie popularnych filmów po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
    populateYears();
    selector();
    popularMovies(currentPage);
});
