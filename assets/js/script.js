/*const dot = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let tx = x;
let ty = y;
const speed = 0.2;

function move(e) {
  tx = e.clientX;
  ty = e.clientY;
  dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
}

function animate() {
  x += (tx - x) * speed;
  y += (ty - y) * speed;
  ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener('mousemove', move);

// Hover en elementos interactivos
const hoverables = 'a, button, .cv-btn';
document.addEventListener('mouseover', (e) => {
  if (e.target.closest(hoverables)) {
    dot.classList.add('cursor--hover');
    ring.classList.add('cursor-ring--hover');
  } else {
    dot.classList.remove('cursor--hover');
    ring.classList.remove('cursor-ring--hover');
  }
});*/


// Seleccionamos los enlaces del menú
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  let minDistance = window.innerHeight;

  sections.forEach((section, idx) => {
    const rect = section.getBoundingClientRect();
    // Si la sección está parcialmente visible
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Si es la última sección, la marcamos como activa si es visible en cualquier parte
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
    threshold: 0.2, //Aumentado para que la animación comience cuando se vea más de la sección
    rootMargin: '0px' //Ajusta este valor si quieres que la animación comience antes/después
});

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});