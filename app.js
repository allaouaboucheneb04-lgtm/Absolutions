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



  // Barre de progression
  const progress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    if(progress) progress.style.width = percent + "%";
  });

  // Effet 3D doux sur le logo hero
  const heroLogo = document.querySelector(".hero-logo");
  if(heroLogo && window.matchMedia("(min-width: 901px)").matches){
    heroLogo.addEventListener("mousemove", (e) => {
      const rect = heroLogo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - .5) * 10;
      const rotateX = -((y / rect.height) - .5) * 10;
      heroLogo.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    heroLogo.addEventListener("mouseleave", () => {
      heroLogo.style.transform = "";
    });
  }

  // Particules dorées discrètes
  const canvas = document.getElementById("goldParticles");
  if(canvas){
    const ctx = canvas.getContext("2d");
    let particles = [];
    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = window.innerWidth < 700 ? 28 : 55;
      particles = Array.from({length: count}, () => ({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*1.8 + .6,
        vx: (Math.random()-.5)*.25,
        vy: Math.random()*.35 + .08,
        a: Math.random()*.55 + .15
      }));
    }
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if(p.y > canvas.height + 10) p.y = -10;
        if(p.x < -10) p.x = canvas.width + 10;
        if(p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(246,189,33,${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    draw();
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
