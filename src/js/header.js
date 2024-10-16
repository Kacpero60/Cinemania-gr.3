
// PODŚWIETLENIE AKTUALNEJ STRONY
const container = document.querySelector(".nav-list");
const links = container.querySelectorAll(".navigation");


for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function() {
    let current = document.querySelector(".navigation-active");
    if (current) {
      current.classList.remove("navigation-active");
    }
    this.classList.add("navigation-active");
  });
}

// OTWIERANIE MENU MOBILNEGO
  const buttonMenu = document.querySelector(".button-menu");
  const navMobile = document.querySelector(".backdrop");
  

    buttonMenu.addEventListener("click", () => {
        navMobile.classList.toggle("hidden");
    });

// ZAMYKANIE MENU MOBILNEGO
    window.addEventListener("resize", () => {
    if (window.innerWidth > 767) { 
        navMobile.classList.remove("hidden");
    }
});

