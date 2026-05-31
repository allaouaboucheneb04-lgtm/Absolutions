const EMAILJS_PUBLIC_KEY = "AuecG8oUqCqCiggFv";
const EMAILJS_SERVICE_ID = "service_6p44ax8";
const EMAILJS_TEMPLATE_ID = "template_8a2jzbe";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

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
    statusText.textContent = "Erreur d'envoi. Contactez-nous sur WhatsApp.";
    statusText.style.color = "#ff6b6b";
  }
});
