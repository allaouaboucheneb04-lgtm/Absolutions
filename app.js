const EMAILJS_PUBLIC_KEY = "AuecG8oUqCqCiggFv";
const EMAILJS_SERVICE_ID = "service_6p44ax8";
const EMAILJS_TEMPLATE_ID = "template_8a2jzbe";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY 
// Animations au défilement
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach(el => revealObserver.observe(el));

// Header dynamique
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if(window.scrollY > 40){ header.classList.add("scrolled"); }
  else { header.classList.remove("scrolled"); }
});

// Chiffres animés
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target || "0", 10);
    const suffix = el.dataset.suffix || "%";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      current += step;
      if(current >= target){
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 24);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => counterObserver.observe(el));

});

document.addEventListener("DOMContentLoaded", function(){
  const btn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if(btn && nav){
    btn.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const form = document.getElementById("quoteForm");
  const statusText = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusText.textContent = "Envoi en cours...";
    statusText.style.color = "#f6bd21";
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      statusText.textContent = "Demande envoyée avec succès ✅";
      statusText.style.color = "#4ade80";
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      statusText.textContent = "Erreur d'envoi. Contactez-nous par email.";
      statusText.style.color = "#ff6b6b";
    }
  });
});
