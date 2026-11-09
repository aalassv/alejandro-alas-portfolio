document.addEventListener("DOMContentLoaded", () => {
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeButton(newTheme);
    });
  }

  function updateThemeButton(theme) {
    const iconSpan = document.querySelector(".theme-icon");
    if (!iconSpan) return;
    if (theme === "light") {
      iconSpan.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else {
      iconSpan.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  }

  const hamburgerBtn = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburgerBtn && navLinks) {
    const closeNav = () => {
      navLinks.classList.remove("show");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    };
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("show");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("show") && !navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeNav();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("show")) {
        closeNav();
        hamburgerBtn.focus();
      }
    });
  }

  const sections = document.querySelectorAll("main section");
  const railLinks = document.querySelectorAll(".rail a");
  if (sections.length > 0 && railLinks.length > 0) {
    const setActive = () => {
      let current = "";
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120) current = sec.id;
      });
      railLinks.forEach((l) => {
        l.classList.toggle("active", l.getAttribute("href") === "#" + current);
      });
    };
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }

  // Subtle reveal-on-scroll (progressive enhancement)
  const revealEls = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (revealEls.length > 0) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      // Stagger children within marked groups
      document.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
        const kids = group.querySelectorAll(":scope > .reveal");
        kids.forEach((kid, i) => {
          kid.style.setProperty("--reveal-delay", Math.min(i * 60, 240) + "ms");
        });
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }
});

const navbar = document.querySelector(".navbar");
if (navbar) {
  const setNavbarState = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", setNavbarState, { passive: true });
  setNavbarState();
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const imageModalEl = document.getElementById("image-modal");
  const featureDialogEl = document.getElementById("feature-dialog");
  if (imageModalEl && imageModalEl.open) {
    imageModalEl.close();
    document.body.classList.remove("no-scroll");
    const track = document.getElementById("modal-track");
    if (track) track.innerHTML = "";
  }
  if (featureDialogEl && featureDialogEl.open) {
    featureDialogEl.close();
    document.body.classList.remove("no-scroll");
  }
});

document.querySelectorAll(".apple-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;
    const link = card.querySelector(".card-link-icon");
    if (link && link.href) {
      if (link.getAttribute("target") === "_blank") {
        window.open(link.href, "_blank", "noopener");
      } else {
        window.location.href = link.href;
      }
    }
  });
});

const imageModal = document.getElementById("image-modal");
const modalTrack = document.getElementById("modal-track");
const closeModalBtn = document.getElementById("close-modal");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const featureContainers = document.querySelectorAll(".feature-media");

if (imageModal && modalTrack && closeModalBtn && prevBtn && nextBtn && featureContainers.length > 0) {
  featureContainers.forEach((container) => {
    const images = container.querySelectorAll(".zoomable-image");
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        modalTrack.innerHTML = "";
        images.forEach((sourceImg, i) => {
          const newImg = document.createElement("img");
          newImg.src = sourceImg.getAttribute("src") || "";
          newImg.alt = sourceImg.getAttribute("alt") || "";
          newImg.dataset.index = String(i);
          modalTrack.appendChild(newImg);
        });
        const multi = images.length > 1;
        prevBtn.style.display = multi ? "flex" : "none";
        nextBtn.style.display = multi ? "flex" : "none";
        document.body.classList.add("no-scroll");
        imageModal.showModal();
        closeModalBtn.focus();
        setTimeout(() => {
          const target = modalTrack.querySelector('[data-index="' + index + '"]');
          if (target) {
            target.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
          }
        }, 10);
      });
    });
  });

  const closeDialog = () => {
    imageModal.close();
    document.body.classList.remove("no-scroll");
    modalTrack.innerHTML = "";
  };
  closeModalBtn.addEventListener("click", closeDialog);
  modalTrack.addEventListener("click", (e) => {
    if (e.target === modalTrack) closeDialog();
  });
  imageModal.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeDialog();
  });
  prevBtn.addEventListener("click", () => {
    modalTrack.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", () => {
    modalTrack.scrollBy({ left: window.innerWidth, behavior: "smooth" });
  });
}

const featureDialog = document.getElementById("feature-dialog");
const closeFeatureDialogBtn = document.getElementById("close-feature-dialog");
const featureButtons = document.querySelectorAll(".trigger-feature-dialog");
const dialogMessageElement = document.getElementById("dialog-message");

if (featureDialog) {
  featureButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const customMessage = btn.getAttribute("data-message");
      if (dialogMessageElement) {
        dialogMessageElement.innerText =
          customMessage || "This feature is currently being built and will be available soon.";
      }
      document.body.classList.add("no-scroll");
      featureDialog.showModal();
    });
  });

  const closeFeatureDialog = () => {
    featureDialog.close();
    document.body.classList.remove("no-scroll");
  };
  if (closeFeatureDialogBtn) closeFeatureDialogBtn.addEventListener("click", closeFeatureDialog);
  featureDialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeFeatureDialog();
  });
  featureDialog.addEventListener("click", (e) => {
    const rect = featureDialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      closeFeatureDialog();
    }
  });
}
