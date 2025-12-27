const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function(){
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

// Photo Carousel Functionality for About Page - Multiple Carousels
document.addEventListener('DOMContentLoaded', function() {
  // Check if carousel exists on the page
  const carouselContainers = document.querySelectorAll('.carousel-container');
  if (carouselContainers.length === 0) return; // Exit if not on about page
  
  // Arrays of captions for each carousel
  const captionsData = {
    '1': [
      'Making my own 3D Cutting Boards',
      'Welded a bird made of spoons and forks',
      'Made a pencil holder as a gift',
      'Made a cross country runner',
      'Made two bookshelf ends of worms reading',
      'Made 2 metal dice'
    ],
    '2': [
      'Eagle Scout Project of making a 27 foot bridge from scratch',
      'Making the bridge with friends',
      'Going on a 53 mile, 5 day backpacking trip',
      'Graduating to Eagle Scout',
      'Creating a foam sled for my troop',
      'Making a robot cosume for Halloween (Age 9)'
    ],
    '3': [
      'Forging a metal hanger',
      'Welding the spoon bird',
      'Creating the 3d cutting boards',
      'Cutting parts out for sled',
      'Painting homemade oak picture frames',
      'Winning the state championship for Valorant as a coach'
    ]
  };
  
  // Initialize each carousel
  carouselContainers.forEach((container) => {
    const carouselId = container.getAttribute('data-carousel');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector(`.carousel-btn-prev[data-carousel="${carouselId}"]`);
    const nextBtn = document.querySelector(`.carousel-btn-next[data-carousel="${carouselId}"]`);
    const caption = document.querySelector(`.carousel-caption[data-carousel="${carouselId}"]`);
    const indicators = document.querySelectorAll(`.carousel-indicators[data-carousel="${carouselId}"] .indicator`);
    
    let currentSlide = 0;
    const captions = captionsData[carouselId];
    
    function showSlide(index) {
      // Remove active class from all slides and indicators
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Add active class to current slide and indicator
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      
      // Update caption
      caption.textContent = captions[index];
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    // Event listeners for buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
      });
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    }
  });
});
// Contact Form Submission
const contactForm = document.forms['submit-to-google-sheet'];
if (contactForm) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxdirSFmxm9NmUfAjWz3CK9ObnGffgcL4R1aBw4DP51xoC5Zrk2p87nJRrzTDWkkOee-Q/exec';
  const formMsg = document.getElementById("form-msg");
  
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
      .then(response => {
        formMsg.innerHTML = "✓ Message sent successfully! I'll get back to you soon.";
        formMsg.style.color = "#27ae60";
        setTimeout(() => { 
          formMsg.innerHTML = ""; 
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 5000);
        contactForm.reset();
      })
      .catch(error => {
        formMsg.innerHTML = "✗ Oops! Something went wrong. Please try again.";
        formMsg.style.color = "#e74c3c";
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        console.error('Error!', error.message);
      });
  });
}
