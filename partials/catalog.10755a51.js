!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var a,c=o("bpxeT"),l=o("2TvXO"),i=document.querySelector(".title"),s=document.querySelector(".text"),u=document.querySelector(".hero-btn.cta"),d=document.querySelector(".hero-btn.more-details"),f=document.querySelector(".hero.container"),p=(document.querySelector(".intro"),a=e(c)(e(l).mark((function t(){var n,r,o,a,c,f,p,v,x,b,k,w;return e(l).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=".concat(n="9daf636d1e8920119d3143cdf70a7f03"),e.prev=2,e.next=5,fetch(r);case 5:if((o=e.sent).ok){e.next=8;break}throw new Error("response was not ok");case 8:return e.next=10,o.json();case 10:if(!((a=e.sent)&&a.results&&a.results.length>0)){e.next=30;break}return c=Math.floor(Math.random()*a.results.length),f=a.results[c],i.textContent=f.title||"Unknown Title",s.textContent=f.overview||"No description available for this movie.",m(),d.style.display="block",p="https://image.tmdb.org/t/p/original".concat(f.backdrop_path),y(p),v="https://api.themoviedb.org/3/movie/".concat(f.id,"/videos?api_key=").concat(n,"&language=en-US"),e.next=23,fetch(v);case 23:return x=e.sent,e.next=26,x.json();case 26:(b=e.sent).results.length>0&&(k=b.results.find((function(e){return"Trailer"===e.type})))?(w="https://www.youtube.com/embed/".concat(k.key),u.onclick=function(){return h(w)}):u.onclick=function(){return h(null)},e.next=31;break;case 30:g();case 31:e.next=37;break;case 33:e.prev=33,e.t0=e.catch(2),console.error("Error fetching movie data:",e.t0),g();case 37:case"end":return e.stop()}}),t,null,[[2,33]])}))),function(){return a.apply(this,arguments)}),y=function(e){f.style.backgroundImage="\n    linear-gradient(83deg, #111 36.85%, rgba(17, 17, 17, 0) 60.05%), \n    url(".concat(e,")\n  ")},m=function(){for(var e=s.innerText;s.scrollHeight>s.clientHeight;)e=e.slice(0,-1),s.innerText=e+"..."},g=function(){i.textContent="Let's Make Your Own Cinema",s.textContent="Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.",s.style.height="auto",u.textContent="Get started",u.onclick=function(){window.location.href="partials/catalog.html"},d.style.display="none"},h=function(e){var t=document.querySelector(".trailerModal"),n=document.getElementById("trailerFrame");e?(n.src=e,n.style.display="block"):(n.style.display="none",document.querySelector(".no-trailer-content")||(document.querySelector(".trailer-modal-content").innerHTML+='\n        <div class="no-trailer-content">\n          <p class="no-trailer">OOPS... We are very sorry, but we couldn\'t find the trailer!</p>\n          <img src="../images/NoTrailer.png" alt="No trailer available" class="no-trailer-img" />\n        </div>\n      ')),t.style.display="flex"},v=function(){var e=document.querySelector(".trailerModal");document.getElementById("trailerFrame").src="",e.style.display="none";var t=document.querySelector(".no-trailer-content");t&&t.remove()};document.querySelector(".close").addEventListener("click",v),window.addEventListener("click",(function(e){var t=document.querySelector(".trailerModal");e.target===t&&v()})),p()}();
//# sourceMappingURL=catalog.10755a51.js.map
