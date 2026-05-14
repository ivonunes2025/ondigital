// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Simple animation trigger for elements on scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Simulator Form Logic (if on simulator page)
const simForm = document.getElementById('sim-form-page');
if (simForm) {
  simForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = simForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'A gerar pré-visualização...';
    btn.disabled = true;

    setTimeout(() => {
      alert('Simulação enviada com sucesso! A nossa equipa entrará em contacto para mostrar a proposta visual gratuita.');
      btn.textContent = originalText;
      btn.disabled = false;
      simForm.reset();
    }, 2000);
  });
}
