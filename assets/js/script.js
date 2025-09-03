// Marcar enlaces del menú cuando te encuentras en las sección
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - sectionHeight/3)) {
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

// Funcionalidad de copiar al portapapeles
document.addEventListener('DOMContentLoaded', () => {
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'mvb.mvidigal@gmail.com';
            navigator.clipboard.writeText(email)
                .then(() => {
                    // Cambiar temporalmente el icono y texto
                    const icon = copyEmailBtn.querySelector('i');
                    const originalIcon = icon.className;
                    icon.className = 'bi bi-check-lg';
                    // Crear y mostrar el mensaje de confirmación
                    const message = document.createElement('div');
                    message.textContent = '¡Correo copiado!';
                    message.style.cssText = `
                        position: absolute;
                        right: -150px;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: rgba(0, 0, 0, 0.8);
                        color: white;
                        padding: 8px 12px;
                        border-radius: 4px;
                        font-size: 14px;
                        white-space: nowrap;
                    `;
                    copyEmailBtn.style.position = 'relative';
                    copyEmailBtn.appendChild(message);
                    
                    // Eliminar el mensaje después de 2 segundos
                    setTimeout(() => {
                        message.remove();
                        icon.className = originalIcon;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error al copiar el email:', err);
                });
        });
    }
});