const EMAILJS_PUBLIC_KEY = "n4Ln13zFITFZtnmdL";
const EMAILJS_SERVICE_ID = "service_awb5pmj";
const EMAILJS_TEMPLATE_ID = "template_7xcmars";

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
    statusText.textContent = "Erreur d'envoi. Appelez-nous au 514-464-0121.";
    statusText.style.color = "#ff6b6b";
  }
});