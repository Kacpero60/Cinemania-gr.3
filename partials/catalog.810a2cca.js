!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a);var o=a("bpxeT"),c=a("2TvXO");o=a("bpxeT"),c=a("2TvXO");function i(e,t){return s.apply(this,arguments)}function s(){return(s=e(o)(e(c).mark((function t(n,r){var a,o,i,s,u,l;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=document.getElementById("popUpContainer"),o=document.getElementById("popUpImage"),i=document.getElementById("popUpDescription"),o.innerHTML="",i.innerHTML="",(s=document.createElement("img")).src="https://image.tmdb.org/t/p/w500".concat(n.poster_path),o.appendChild(s),e.next=10,p(r);case 10:u=e.sent,l=n.genre_ids.map((function(e){return u[e]})).filter((function(e){return e})),i.innerHTML="\n            <h2>".concat(n.title,'</h2>\n            <p class="pop-up-description-data vote" >Vote / Votes: <span> ').concat(n.vote_average," / ").concat(n.vote_count,'</span></p>\n            <p class="pop-up-description-data popularity">Popularity: <span>').concat(n.popularity,'</span></p>\n            <p class="pop-up-description-data gendre">Genre: <span>').concat(l.length>0?l.join(", "):"",'</span></p>\n            <p class="pop-up-description-data about"> ABOUT:</p>\n            <p class="pop-up-description-data about-desc"> ').concat(n.overview,'</p>\n            <button class="buttonAddToMyLibrary" id="buttonAddToMyLibrary">Add to my</button>\n        '),a.style.display="flex",document.getElementById("closePopUp").onclick=function(){a.style.display="none"},document.getElementById("buttonAddToMyLibrary").addEventListener("click",(function(){d(n.id),alert("".concat(n.title," został dodany do Twojej biblioteki!"))}));case 16:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function p(e){return u.apply(this,arguments)}function u(){return(u=e(o)(e(c).mark((function t(n){var r,a,o;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(n,"&language=en-US&"));case 3:return r=e.sent,e.next=6,r.json();case 6:return a=e.sent,o={},a.genres.forEach((function(e){o[e.id]=e.name})),e.abrupt("return",o);case 12:return e.prev=12,e.t0=e.catch(0),console.error("Błąd podczas pobierania gatunków:",e.t0),e.abrupt("return",{});case 16:case"end":return e.stop()}}),t,null,[[0,12]])})))).apply(this,arguments)}function d(e){var t=JSON.parse(localStorage.getItem("library"))||[];t.includes(e)||(t.push(e),localStorage.setItem("library",JSON.stringify(t)))}var l="26ee83a5e26d7fcb87f8d8380af6bd82",f=document.querySelector(".gallery"),m=1,h=24,v="",g={};function y(){return(y=e(o)(e(c).mark((function t(){var n,r,a,o,i,s;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.getElementById("countrySelect"),e.prev=1,e.next=4,fetch("https://restcountries.com/v3.1/all");case 4:return r=e.sent,e.next=7,r.json();case 7:for(a=e.sent,o=0;o<a.length;o++)i=a[o],(s=document.createElement("option")).value=i.cca2,s.textContent=i.name.common,n.appendChild(s);e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error("Błąd podczas pobierania krajów:",e.t0);case 14:case"end":return e.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}function w(){return(w=e(o)(e(c).mark((function t(){var n,r,a,o;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=document.getElementById("yearSelect"),r=(new Date).getFullYear(),a=r;a>=1980;a--)(o=document.createElement("option")).value=a,o.textContent=a,n.appendChild(o);case 3:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function x(){return b.apply(this,arguments)}function b(){return(b=e(o)(e(c).mark((function t(){var n,r,a,o,i,s,p;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for((n=document.getElementById("pagination")).innerHTML="",m>=1&&((r=document.createElement("button")).textContent="<",r.classList.add("prevnext-btn"),r.addEventListener("click",(function(){m--,v?C(v,m):k(m),x()})),n.appendChild(r)),a=1;a<=Math.min(3,h);a++)(o=document.createElement("button")).textContent=a,o.classList.add("pagination-btn"),a===m&&o.classList.add("active"),o.addEventListener("click",(function(){m=a,v?C(v,m):k(m),x()})),n.appendChild(o);h>3&&((i=document.createElement("div")).textContent="...",i.classList.add("dots"),n.appendChild(i),(s=document.createElement("button")).textContent=h,s.classList.add("pagination-btn"),s.addEventListener("click",(function(){m=h,v?C(v,m):k(m),x()})),n.appendChild(s)),m<h&&((p=document.createElement("button")).textContent=">",p.classList.add("prevnext-btn"),p.addEventListener("click",(function(){m++,v?C(v,m):k(m),x()})),n.appendChild(p));case 6:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function k(){return E.apply(this,arguments)}function E(){return E=e(o)(e(c).mark((function t(){var n,r,a,o,s,p,u=arguments;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>0&&void 0!==u[0]?u[0]:1,r="",a="",o="https://api.themoviedb.org/3/movie/popular?api_key=".concat(l,"&language=en-US&include_adult=false&page=").concat(n).concat(r).concat(a),e.prev=4,e.next=7,fetch(o);case 7:if((s=e.sent).ok){e.next=10;break}throw new Error("response was not ok");case 10:return e.next=12,s.json();case 12:p=e.sent,h=p.total_pages,f.innerHTML="",p.results.length>0?p.results.forEach((function(e){var t=document.createElement("div");t.className="movie";var n=document.createElement("img");n.src="https://image.tmdb.org/t/p/w500".concat(e.poster_path);var r=document.createElement("p");r.textContent=e.title,r.className="movie-title";var a=document.createElement("p"),o=e.genre_ids.map((function(e){return g[e]})).filter((function(e){return e})).join(", "),c=e.release_date.split("-")[0];a.textContent="".concat(o," | ").concat(c),a.className="movie-genres-year",t.appendChild(n),t.appendChild(r),t.appendChild(a),f.appendChild(t),t.addEventListener("click",(function(){i(e,l)}))})):f.textContent="OOPS... Brak wyników pasujących do wyszukiwania.",x(),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(4),console.error("Błąd podczas pobierania filmów:",e.t0);case 22:case"end":return e.stop()}}),t,null,[[4,19]])}))),E.apply(this,arguments)}function C(e){return L.apply(this,arguments)}function L(){return L=e(o)(e(c).mark((function t(n){var r,a,o,s,p,u,d=arguments;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=d.length>1&&void 0!==d[1]?d[1]:1,a="",o="",s="https://api.themoviedb.org/3/search/movie?query=".concat(n,"&api_key=").concat(l,"&language=en-US&include_adult=false&page=").concat(r).concat(o).concat(a),e.prev=4,e.next=7,fetch(s);case 7:if((p=e.sent).ok){e.next=10;break}throw new Error("response was not ok");case 10:return e.next=12,p.json();case 12:u=e.sent,h=u.total_pages,f.innerHTML="",u.results.length>0?u.results.forEach((function(e){var t=document.createElement("div");t.className="movie",fetch("https://api.themoviedb.org/3/movie/".concat(e.id,"/images?api_key=").concat(l)).then((function(e){return e.json()})).then((function(n){if(n.posters.length>0){var r=document.createElement("img");r.src="https://image.tmdb.org/t/p/w500".concat(n.posters[0].file_path),t.appendChild(r)}var a=document.createElement("p");a.textContent=e.title,a.className="movie-title";var o=document.createElement("p"),c=e.genre_ids.map((function(e){return g[e]})).filter((function(e){return e})).join(", "),s=e.release_date.split("-")[0];o.textContent="".concat(c," | ").concat(s),o.className="movie-genres-year",t.appendChild(a),t.appendChild(o),f.appendChild(t),t.addEventListener("click",(function(){i(e,l)}))}))})):f.textContent="OOPS... Brak wyników pasujących do wyszukiwania.",x(),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(4),console.error("Błąd podczas wyszukiwania filmów:",e.t0);case 22:case"end":return e.stop()}}),t,null,[[4,19]])}))),L.apply(this,arguments)}function _(){return B.apply(this,arguments)}function B(){return(B=e(o)(e(c).mark((function t(){var n,r,a;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(l),e.prev=1,e.next=4,fetch(n);case 4:if((r=e.sent).ok){e.next=7;break}throw new Error("response was not ok");case 7:return e.next=9,r.json();case 9:a=e.sent,g={},a.genres.forEach((function(e){g[e.id]=e.name})),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.error("error:",e.t0);case 17:case"end":return e.stop()}}),t,null,[[1,14]])})))).apply(this,arguments)}function T(){return(T=e(o)(e(c).mark((function t(){return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_();case 2:return e.next=4,k();case 4:case"end":return e.stop()}}),t)})))).apply(this,arguments)}document.getElementById("searchButton").addEventListener("click",e(o)(e(c).mark((function t(){return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v=document.getElementById("searchInput").value,m=1,e.next=4,C(v,m);case 4:case"end":return e.stop()}}),t)})))),function(){y.apply(this,arguments)}(),function(){w.apply(this,arguments)}(),function(){T.apply(this,arguments)}()}();
//# sourceMappingURL=catalog.810a2cca.js.map
