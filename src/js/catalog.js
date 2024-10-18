const apikey = '26ee83a5e26d7fcb87f8d8380af6bd82';
const gallery = document.querySelector(".gallery");
let currentPage = 1;
let totalPages = 24;
const perPage = 20;
let keyWord = '';
let selectedCountry = '';
let selectedYear = '';

//funkcja, co daje kraje do wyboru
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
    } catch(error) {
        console.error('error fetching countries');
    }
}

//funkcja co daje lata do wyboru
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

//renderowanie przycisków
async function renderBtn() {
    const paginationBtn = document.getElementById('pagination');
    paginationBtn.innerHTML = '';

   //przycisk do cofania '<'
   if (currentPage >= 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '<';
        prevBtn.classList.add('prevnext-btn');

        
        prevBtn.addEventListener('click', () => {
            currentPage--;
            
            if (keyWord) {
                searchMovies(keyWord, currentPage)
            } else {
                popularMovies(currentPage);
            }
            renderBtn();
        });
        paginationBtn.appendChild(prevBtn);
    }
    
    //wyświetlenie pierwszych trzech stron
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('pagination-btn');
        
        if( i === currentPage) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            currentPage = i;

            if (keyWord) {
                searchMovies(keyWord, currentPage);
            } else {
                popularMovies(currentPage);
            }
            renderBtn();
        });
        paginationBtn.appendChild(btn);
   }

   
   //kropki, gdy jest wiecej niz 3 strony
   if (totalPages > 3) {
       const dots =document.createElement('div');
       dots.textContent = '...';
       paginationBtn.appendChild(dots);
       dots.classList.add('dots');
       
       //wyswietlenie 24 strony
       const lastBtn = document.createElement('button');
       lastBtn.textContent = 24;
       lastBtn.classList.add('pagination-btn');
       
       lastBtn.addEventListener('click', () => {
           currentPage = 24;
           
           if (keyWord) {
               searchMovies(keyWord, currentPage);
            } else {
                popularMovies(currentPage);
            }
            renderBtn();
        });
        paginationBtn.appendChild(lastBtn);
   }

   //przycisk do nastepnej strony '>'
   if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.classList.add('prevnext-btn');

    nextBtn.addEventListener('click', () => {
        currentPage++;

        if (keyWord) {
            searchMovies(keyWord, currentPage)
        } else {
            popularMovies(currentPage);
        }
        renderBtn();
    });
    paginationBtn.appendChild(nextBtn);
}
}

//funkcja do pobierania popularnych filmów, jest wyświetlana po załadowaniu strony
async function popularMovies(page = 1, selectedCountry = '', selectedYear = '') {
    const regionParams = selectedCountry ? `&region=${selectedCountry}` : '';
    const yearParams = selectedYear ? `&primary_release_year=${selectedYear}` : '';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&include_adult=false&page=${page}${regionParams}${yearParams}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('response was not ok')
        }
        const data = await response.json();

        gallery.innerHTML = '';

        if (data.results.length > 0) {
            for (const movie of data.results) {
                const movieEl = document.createElement('div');
                movieEl.className = 'movie';

                const imgEl = document.createElement('img');
                imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; 
                
                const titleEl = document.createElement('p')
                titleEl.textContent = movie.title
                titleEl.className = 'movie-title';

                movieEl.appendChild(imgEl);
                gallery.appendChild(movieEl);
                movieEl.appendChild(titleEl);
            }
        } else {
                gallery.textContent =  'OOPS...We are very sorry! You dont have any results matching your search.';
        }

        totalPages = data.total_pages;
        renderBtn();
        } catch (error) {
                console.error('error fetching movies:', error);
        }
            }

//funkcja co wyszukuje wszystkie filmy po wpisaniu keyword'a
async function searchMovies(keyWord, page = 1) {
    const yearParams = selectedYear ? `&primary_release_year=${selectedYear}` : '';
    const regionParams = selectedCountry ? `&region=${selectedCountry}` : '';
    const apiURL = `https://api.themoviedb.org/3/search/movie?query=${keyWord}&api_key=${apikey}&language=en-US&include_adult=false&page=${page}${regionParams}${yearParams}`;

    console.log(apiURL); 

try {
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error('response was not ok')
    }
    const data = await response.json();

    gallery.innerHTML = '';

if (data.results.length > 0) {
    for (const movie of data.results) {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie';


     // pobrane obrazy dla danego filmu
     const imageResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${apikey}`);
     const imageData = await imageResponse.json();

     // sprawdzanie czy są dostępne postery
     if (imageData.posters.length > 0) {
         const imgEl = document.createElement('img');
         imgEl.src = `https://image.tmdb.org/t/p/w500${imageData.posters[0].file_path}`; 
         movieEl.appendChild(imgEl);
     }
        //tytuł filmu
        const titleEl = document.createElement('p')
        titleEl.textContent = movie.title
        titleEl.className = 'movie-title';

        gallery.appendChild(movieEl);
        movieEl.appendChild(titleEl);
    }
} else {
        gallery.textContent =  'OOPS...We are very sorry! You dont have any results matching your search.';
}

totalPages = data.total_pages;
renderBtn();
} catch (error) {
        console.error('error fetching movies:', error);
}
}


//wyszukiwanie przycisku
document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();

    //wartość inputa
     keyWord = document.getElementById('searchInput').value;
     selectedYear = document.getElementById('yearSelect').value;
     selectedCountry = document.getElementById('countrySelect').value;

    if (keyWord === "") {
        return;
    }

    //wywołanie searchMovies
    currentPage = 1;
    searchMovies(keyWord);

});

//wywołanie popularMovies po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
    populateYears();
    selector();
    popularMovies(currentPage);
});
