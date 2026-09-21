/* ============================================================
   THEME
============================================================ */

const themeToggle = document.getElementById("themeToggle");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

/* ============================================================
   GET CURRENT THEME
============================================================ */

function getCurrentTheme() {
  const explicitTheme = document.documentElement.getAttribute("data-theme");

  if (explicitTheme === "light" || explicitTheme === "dark") {
    return explicitTheme;
  }

  return systemTheme.matches ? "dark" : "light";
}

/* ============================================================
   UPDATE THEME BUTTON
============================================================ */

function updateThemeButton() {
  if (!themeToggle) {
    return;
  }

  const currentTheme = getCurrentTheme();

  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);

  themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
}

/* ============================================================
   INITIAL THEME
============================================================ */

/*
 * If the user has previously selected a theme,
 * restore it.
 *
 * Otherwise:
 * don't set data-theme.
 *
 * CSS will automatically follow:
 * prefers-color-scheme.
 */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

updateThemeButton();

/* ============================================================
   THEME TOGGLE
============================================================ */

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = getCurrentTheme();

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    /*
     * Explicitly set the selected theme.
     */

    document.documentElement.setAttribute("data-theme", newTheme);

    /*
     * Remember user's choice.
     */

    localStorage.setItem("theme", newTheme);

    /*
     * Update accessibility labels.
     */

    updateThemeButton();
  });
}

/* ============================================================
   SYSTEM THEME CHANGE
============================================================ */

/*
 * If the user has NOT manually selected a theme,
 * continue following the OS/browser theme.
 */

systemTheme.addEventListener("change", () => {
  const savedTheme = localStorage.getItem("theme");

  /*
   * Only update when the user
   * has not manually selected a theme.
   */

  if (!savedTheme) {
    updateThemeButton();
  }
});

/* ============================================================
   MOBILE MENU TOGGLE
============================================================ */

const navToggle = document.getElementById("navToggle");

const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    navToggle.classList.toggle("open", isOpen);

    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /*
   * Close mobile menu
   * when a navigation link is clicked.
   */

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      navToggle.classList.remove("open");

      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================================
   SCROLL SPY
============================================================ */

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll(".nav-link");

function highlightNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;

    const height = section.offsetHeight;

    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}

window.addEventListener("scroll", highlightNav, { passive: true });

highlightNav();
