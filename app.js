const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ===============================
// CONFIGURATION EMAILJS
// 1) Va sur https://www.emailjs.com
// 2) Crée un service email
// 3) Crée un template
// 4) Remplace les 3 valeurs ci-dessous
// ===============================
const EMAILJS_PUBLIC_KEY = "n4Ln13zFITFZtnmdL";
const EMAILJS_SERVICE_ID = 'service_awb5pmj';
const EMAILJS_TEMPLATE_ID = 'template_7xcmars';
const DESTINATION_EMAIL = 'abtechnologiesolution@gmail.com';

const emailJsReady = () => {
  return window.emailjs &&
    !EMAILJS_PUBLIC_KEY.includes('REMPLACE') &&
    !EMAILJS_SERVICE_ID.includes('REMPLACE') &&
    !EMAILJS_TEMPLATE_ID.includes('REMPLACE');
};

try {
  if (window.emailjs && !EMAILJS_PUBLIC_KEY.includes('REMPLACE')) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
} catch (error) {
  console.warn('EmailJS init error:', error);
}

const showMessage = (text, type = 'success') => {
  let box = document.getElementById('formStatus');
  if (!box) {
    box = document.createElement('div');
    box.id = 'formStatus';
    box.className = 'form-status';
    document.getElementById('quoteForm')?.appendChild(box);
  }
  box.textContent = text;
  box.className = `form-status ${type}`;
};

const sendByMailto = (data) => {
  const subject = encodeURIComponent('Nouvelle demande de soumission - AB Technologie Solution');
  const body = encodeURIComponent(`Bonjour,\n\nNouvelle demande de soumission :\n\nNom: ${data.nom}\nTéléphone: ${data.telephone}\nEmail: ${data.email || '-'}\nType de projet: ${data.projet}\nBesoin principal: ${data.besoin}\nBudget: ${data.budget}\n\nMessage:\n${data.message || '-'}\n`);
  window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
};

document.getElementById('quoteForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());

  if (!emailJsReady()) {
    showMessage('EmailJS n’est pas encore configuré. Le message va s’ouvrir par email.', 'warning');
    sendByMailto(data);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours...';
  showMessage('Envoi de votre demande...', 'loading');

  const templateParams = {
    to_email: DESTINATION_EMAIL,
    from_name: data.nom,
    from_email: data.email,
    phone: data.telephone,
    project_type: data.projet,
    main_need: data.besoin,
    budget: data.budget,
    message: data.message || '-',
    reply_to: data.email,
    subject: 'Nouvelle demande de soumission - AB Technologie Solution'
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    showMessage('✅ Demande envoyée avec succès. Je vous réponds rapidement.', 'success');
    form.reset();
  } catch (error) {
    console.error('EmailJS send error:', error);
    showMessage('❌ Erreur EmailJS. Le message va s’ouvrir par email.', 'error');
    sendByMailto(data);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer la demande';
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
