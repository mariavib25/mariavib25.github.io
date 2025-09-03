// Selección enlaces del menú
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  let minDistance = window.innerHeight;

  sections.forEach((section, idx) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (idx === sections.length - 1) {
        current = section.getAttribute("id");
      } else if (rect.top >= -150 && rect.top < minDistance) {
        minDistance = rect.top;
        current = section.getAttribute("id");
      }
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

//Animación del texto section about
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 150); //Pequeño retraso para mejor efecto
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2, 
    rootMargin: '0px' 
});

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});