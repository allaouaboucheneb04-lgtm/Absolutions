const EMAILJS_PUBLIC_KEY = "AuecG8oUqCqCiggFv";
const EMAILJS_SERVICE_ID = "service_6p44ax8";
const EMAILJS_TEMPLATE_ID = "template_8a2jzbe";

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }


  // Animations stables au défilement
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Header avec ombre au scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // Chiffres animés
  const counters = document.querySelectorAll(".counter");
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target || "0", 10);
        const suffix = el.dataset.suffix || "";
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 24);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => counterObserver.observe(el));
  }


  const form = document.getElementById("quoteForm");
  const statusText = document.getElementById("formStatus");

  if (form && statusText) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      statusText.textContent = "Envoi en cours...";
      statusText.style.color = "#f6bd21";

      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        statusText.textContent = "Demande envoyée avec succès ✅";
        statusText.style.color = "#4ade80";
        form.reset();
      } catch (error) {
        console.error(error);
        statusText.textContent = "Erreur d'envoi. Contactez-nous par email.";
        statusText.style.color = "#ff6b6b";
      }
    });
  }
});
