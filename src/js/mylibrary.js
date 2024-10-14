function addMovieToLibrary(movie) {
    const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
    myLibrary.push(movie);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


// funkcja do ładowania filmów z lokalnej biblioteki
function loadMyLibrary() {
    const gallery = document.querySelector(".gallery-library");
    const message = document.querySelector(".message");
    const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

    gallery.innerHTML = ''; 
    message.textContent = ''; 

    if (myLibrary.length > 0) {
        for (const movie of myLibrary) {
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
        message.textContent = 'OOPS...We are very sorry! You dont have any movies at your library.';
    }
}

// Wywołanie funkcji po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
    loadMyLibrary();
});
