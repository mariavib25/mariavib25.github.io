// Seleccionamos los enlaces del menú
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  let minDistance = window.innerHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    // Calcula la distancia desde el top de la sección al top de la ventana
    if (rect.top >= -150 && rect.top < minDistance) {
      minDistance = rect.top;
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
