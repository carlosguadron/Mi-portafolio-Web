// ===========================
// SCRIPT PRINCIPAL DEL PORTAFOLIO
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ JavaScript cargado y optimizado");

  // ===========================
  // 1. EFECTO TILT PARA TARJETAS DE PROYECTOS
  // ===========================
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxTilt = 10;

      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  // ===========================
  // 2. ANIMACIÓN FADE-IN / REVEAL AL HACER SCROLL
  // ===========================
  const revealElements = document.querySelectorAll('.reveal');
  
  const handleReveal = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleReveal);
  window.addEventListener('load', handleReveal);
  handleReveal(); // Ejecución inicial

  // ===========================
  // 3. CAMBIO DE NAVBAR AL HACER SCROLL
  // ===========================
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

// ===========================
  // 4. SISTEMA DE FILTRADO DE PROYECTOS
  // ===========================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Quitar 'active' de todos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir 'active' al clickeado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          
          // Comprueba si incluye el filtro o si está en 'all'
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===========================
  // 5. LIGHTBOX PARA GALERÍA DE IMÁGENES
  // ===========================
  const lightbox = document.getElementById('lightbox');
  
  // Solo ejecuta la lógica del lightbox si la página actual lo tiene
  if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const images = document.querySelectorAll('.lightbox-trigger');

    let currentIndex = 0;

    const openLightbox = (index) => {
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
    };

    const updateLightboxImage = () => {
      if (images.length > 0) {
        const currentImg = images[currentIndex];
        lightboxImg.src = currentImg.src;
        captionText.innerHTML = currentImg.alt;
      }
    };

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      document.body.style.overflow = 'auto'; // Restaura el scroll
    };

    images.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
      });
    }

    // Cierra al hacer clic en el fondo negro
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Controles por teclado
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('show')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    });
  }
});