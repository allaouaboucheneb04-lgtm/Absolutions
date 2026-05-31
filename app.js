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
