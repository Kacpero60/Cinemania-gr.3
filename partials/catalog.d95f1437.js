async function e(e,t){const n=document.getElementById("popUpContainer"),a=document.getElementById("popUpImage"),o=document.getElementById("popUpDescription");a.innerHTML="",o.innerHTML="";const i=document.createElement("img");i.src=`https://image.tmdb.org/t/p/w500${e.poster_path}`,a.appendChild(i);const c=await async function(e){try{const t=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${e}&language=en-US`),n=await t.json(),a={};return n.genres.forEach((e=>{a[e.id]=e.name})),a}catch(e){return console.error("Błąd podczas pobierania gatunków:",e),{}}}(t),s=e.genre_ids.map((e=>c[e])).filter((e=>e)),d=(JSON.parse(localStorage.getItem("library"))||[]).some((t=>t.id===e.id));o.innerHTML=`\n        <h2>${e.title}</h2>\n        <p class="pop-up-description-data vote">Vote / Votes: <span>${e.vote_average} / ${e.vote_count}</span></p>\n        <p class="pop-up-description-data popularity">Popularity: <span>${e.popularity}</span></p>\n        <p class="pop-up-description-data genre">Genre: <span>${s.length>0?s.join(", "):""}</span></p>\n        <p class="pop-up-description-data about">ABOUT:</p>\n        <p class="pop-up-description-data about-desc">${e.overview}</p>\n        <button class="buttonAddToMyLibrary" id="buttonAddToMyLibrary">${d?"Remove from my library":"Add to my library"}</button>\n    `,n.style.display="flex",document.getElementById("closePopUp").onclick=function(){n.style.display="none"};document.getElementById("buttonAddToMyLibrary").onclick=function(){!function(e){let t=JSON.parse(localStorage.getItem("library"))||[];const n=t.findIndex((t=>t.id===e.id));-1===n?(t.push(e),alert(`${e.title} został dodany do Twojej biblioteki!`)):(t.splice(n,1),alert(`${e.title} został usunięty z Twojej biblioteki!`));localStorage.setItem("library",JSON.stringify(t))}(e);const t=(JSON.parse(localStorage.getItem("library"))||[]).some((t=>t.id===e.id));this.textContent=t?"Remove from my library":"Add to my library"}}const t=document.querySelector(".gallery");let n=1,a=24,o="",i={};async function c(){const e=document.getElementById("pagination");if(e.innerHTML="",n>=1){const t=document.createElement("button");t.textContent="<",t.classList.add("prevnext-btn"),t.addEventListener("click",(()=>{n--,o?d(o,n):s(n),c()})),e.appendChild(t)}for(let t=1;t<=Math.min(3,a);t++){const a=document.createElement("button");a.textContent=t,a.classList.add("pagination-btn"),t===n&&a.classList.add("active"),a.addEventListener("click",(()=>{n=t,o?d(o,n):s(n),c()})),e.appendChild(a)}if(a>3){const t=document.createElement("div");t.textContent="...",t.classList.add("dots"),e.appendChild(t);const i=document.createElement("button");i.textContent=a,i.classList.add("pagination-btn"),i.addEventListener("click",(()=>{n=a,o?d(o,n):s(n),c()})),e.appendChild(i)}if(n<a){const t=document.createElement("button");t.textContent=">",t.classList.add("prevnext-btn"),t.addEventListener("click",(()=>{n++,o?d(o,n):s(n),c()})),e.appendChild(t)}}async function s(n=1){const o=`https://api.themoviedb.org/3/movie/popular?api_key=26ee83a5e26d7fcb87f8d8380af6bd82&language=en-US&include_adult=false&page=${n}`;try{const n=await fetch(o);if(!n.ok)throw new Error("response was not ok");const s=await n.json();a=s.total_pages,t.innerHTML="",s.results.length>0?s.results.forEach((n=>{const a=document.createElement("div");a.className="movie";const o=document.createElement("img");o.src=`https://image.tmdb.org/t/p/w500${n.poster_path}`;const c=document.createElement("p");c.textContent=n.title,c.className="movie-title";const s=document.createElement("p"),d=n.genre_ids.map((e=>i[e])).filter((e=>e)).join(", "),r=n.release_date.split("-")[0];s.textContent=`${d} | ${r}`,s.className="movie-genres-year",a.appendChild(o),a.appendChild(c),a.appendChild(s),t.appendChild(a),a.addEventListener("click",(()=>{e(n,"26ee83a5e26d7fcb87f8d8380af6bd82")}))})):t.textContent="OOPS... Brak wyników pasujących do wyszukiwania.",c()}catch(e){console.error("Błąd podczas pobierania filmów:",e)}}async function d(n,o=1){const s=`https://api.themoviedb.org/3/search/movie?query=${n}&api_key=26ee83a5e26d7fcb87f8d8380af6bd82&language=en-US&include_adult=false&page=${o}`;try{const n=await fetch(s);if(!n.ok)throw new Error("response was not ok");const o=await n.json();a=o.total_pages,t.innerHTML="",o.results.length>0?o.results.forEach((n=>{const a=document.createElement("div");a.className="movie",fetch(`https://api.themoviedb.org/3/movie/${n.id}/images?api_key=26ee83a5e26d7fcb87f8d8380af6bd82`).then((e=>e.json())).then((o=>{if(o.posters.length>0){const e=document.createElement("img");e.src=`https://image.tmdb.org/t/p/w500${o.posters[0].file_path}`,a.appendChild(e)}const c=document.createElement("p");c.textContent=n.title,c.className="movie-title";const s=document.createElement("p"),d=n.genre_ids.map((e=>i[e])).filter((e=>e)).join(", "),r=n.release_date.split("-")[0];s.textContent=`${d} | ${r}`,s.className="movie-genres-year",a.appendChild(c),a.appendChild(s),t.appendChild(a),a.addEventListener("click",(()=>{e(n,"26ee83a5e26d7fcb87f8d8380af6bd82")}))}))})):t.textContent="OOPS... Brak wyników pasujących do wyszukiwania.",c()}catch(e){console.error("Błąd podczas wyszukiwania filmów:",e)}}document.getElementById("searchButton").addEventListener("click",(async()=>{o=document.getElementById("searchInput").value,n=1,await d(o,n)})),async function(){const e=document.getElementById("countrySelect");try{const t=await fetch("https://restcountries.com/v3.1/all"),n=await t.json();for(let t=0;t<n.length;t++){const a=n[t],o=document.createElement("option");o.value=a.cca2,o.textContent=a.name.common,e.appendChild(o)}}catch(e){console.error("Błąd podczas pobierania krajów:",e)}}(),async function(){const e=document.getElementById("yearSelect");for(let t=(new Date).getFullYear();t>=1980;t--){const n=document.createElement("option");n.value=t,n.textContent=t,e.appendChild(n)}}(),async function(){await async function(){try{const e=await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=26ee83a5e26d7fcb87f8d8380af6bd82");if(!e.ok)throw new Error("response was not ok");const t=await e.json();i={},t.genres.forEach((e=>{i[e.id]=e.name}))}catch(e){console.error("error:",e)}}(),await s()}();
//# sourceMappingURL=catalog.d95f1437.js.map
