(function () {
  "use strict";

  var menuBtn = document.querySelector(".c-menu-btn");
  var nav = document.getElementById("c-nav");
  var header = document.querySelector(".c-header");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (menuBtn && nav) {
    var closeMenu = function () {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    };
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("is-open")) closeMenu();
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  var revealEls = document.querySelectorAll(".c-reveal");
  if (revealEls.length > 0) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("c-is-visible"); });
    } else {
      document.querySelectorAll("[data-c-reveal-stagger]").forEach(function (group) {
        var kids = group.querySelectorAll(":scope > .c-reveal");
        for (var i = 0; i < kids.length; i++) {
          kids[i].style.setProperty("--c-reveal-delay", Math.min(i * 60, 240) + "ms");
        }
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("c-is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  // Stats count-up (meaningful microanimation), disabled for reduced motion
  var countEls = document.querySelectorAll("[data-c-count]");
  if (countEls.length > 0 && !reduceMotion && "IntersectionObserver" in window) {
    var animateCount = function (el) {
      var raw = (el.getAttribute("data-c-count-final") || el.textContent || "").trim();
      if (!el.getAttribute("data-c-count-final")) el.setAttribute("data-c-count-final", raw);
      var match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;
      var target = parseInt(match[1], 10);
      var suffix = match[2] || "";
      var start = 0;
      var duration = 700;
      var startTime = null;
      var step = function (ts) {
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (target - start) * eased) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
        else el.textContent = raw;
      };
      window.requestAnimationFrame(step);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    countEls.forEach(function (el) { cio.observe(el); });
  }
})();
