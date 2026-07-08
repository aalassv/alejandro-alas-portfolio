document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);
  updateButtonStatus(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateButtonStatus(newTheme);
  });

  function updateButtonStatus(theme) {
    const iconSpan = document.querySelector(".theme-icon");

    if (theme === "light") {
      iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    } else {
      iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  // --- Mobile Menu Toggle ---
  const hamburgerBtn = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      // Toggles the 'show' class to open/close the menu
      navLinks.classList.toggle("show");
    });
  }

  // --- Scroll Spy for Rail Navigation (Case Studies) ---
  const sections = document.querySelectorAll("main section");
  const links = document.querySelectorAll(".rail a");

  if (sections.length > 0 && links.length > 0) {
    const setActive = () => {
      let current = "";
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120) current = sec.id;
      });
      links.forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === "#" + current),
      );
    };
    window.addEventListener("scroll", setActive);
    setActive(); //
  }
});

// --- Clickable Cards ---
const projectCards = document.querySelectorAll(".apple-card");

projectCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (!e.target.closest(".card-link-icon")) {
      const link = card.querySelector(".card-link-icon");

      if (link && link.href) {
        if (link.getAttribute("target") === "_blank") {
          window.open(link.href, "_blank");
        } else {
          window.location.href = link.href;
        }
      }
    }
  });
});
