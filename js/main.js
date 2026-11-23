document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. ALTERNÂNCIA DE TEMA (ESCURO / CLARO)
     ========================================= */
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const applyTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("portfolio-theme", theme);
  };

  // Mantém o tema escuro como padrão caso não haja preferência salva
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  /* =========================================
     2. MENU MOBILE
     ========================================= */
  const menuToggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");

  const closeMobileMenu = () => {
    navMenu.classList.remove("is-open");
    menuToggleBtn.classList.remove("is-active");
    menuToggleBtn.setAttribute("aria-expanded", "false");
  };

  menuToggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggleBtn.classList.toggle("is-active", isOpen);
    menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* =========================================
     3. COPIAR E-MAIL COM FEEDBACK
     ========================================= */
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const copyFeedback = document.getElementById("copy-feedback");
  const emailAddress = "randommac5br@gmail.com";

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyFeedback.textContent = "E-mail copiado para a área de transferência!";
      } catch {
        copyFeedback.textContent = "Não foi possível copiar automaticamente. Use o link acima.";
      }

      setTimeout(() => {
        copyFeedback.textContent = "";
      }, 3000);
    });
  }

  /* =========================================
     4. ANIMAÇÃO DE APARIÇÃO AO ROLAR
     ========================================= */
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));

  /* =========================================
     5. ANO DINÂMICO NO RODAPÉ
     ========================================= */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
