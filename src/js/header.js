document.addEventListener("DOMContentLoaded", () => {

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
  
  if (buttonMenu && navMobile) {
      buttonMenu.addEventListener("click", () => {
        navMobile.classList.toggle("hidden");
    })
  };
  
  // ZAMYKANIE MENU MOBILNEGO
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) { 
      navMobile.classList.remove("hidden");
    }
  });
  
  navMobile.addEventListener('click', () => {
     navMobile.classList.remove("hidden");
  });
  
  // BUTTON
  const toggleSwitch = document.querySelector(".toggle-button");

  toggleSwitch.addEventListener('click', () => {
    const currentTheme = localStorage.getItem("theme");
    const typeTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const themes = document.querySelectorAll(".theme");

    document.body.setAttribute('data-theme', typeTheme);
    localStorage.setItem('theme', typeTheme);

    themes.forEach((theme) => {
    theme.classList.toggle("dark");
  });
  });
}); 
