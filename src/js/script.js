import hamburger from "./modules/hamburger";

window.addEventListener("DOMContentLoaded", function () {
  hamburger();
});


// ======================
// PORTFOLIO FILTER
// ======================
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  if (filterButtons.length === 0 || portfolioItems.length === 0) {
    console.log('Portfolio elements not found, skipping filter initialization');
    return;
  }

  console.log('Initializing portfolio filter...');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Filter clicked:', this.getAttribute('data-filter'));

      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'scale(1)';
      });

      this.classList.add('active');
      this.style.transform = 'scale(1.05)';

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  console.log('Portfolio filter initialized successfully');
});
