// Smooth scrolling only - No parallax effect
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links (excluding contact buttons)
  document.querySelectorAll('a[href^="#"]:not(.contact-btn)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Modal functionality
  const modal = document.getElementById('contactModal');
  const contactButtons = document.querySelectorAll('.contact-btn');
  const closeButton = document.querySelector('.modal-close');
  const contactForm = document.getElementById('contactForm');

  // Open modal when clicking contact buttons
  contactButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal when clicking close button
  closeButton.addEventListener('click', function() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when clicking outside the modal content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

  // Handle form submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic front-end validation safeguard
    if (!name || !email || !message) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    const endpoint = 'https://oxebprwofnrplnxxpaxr.supabase.co/functions/v1/porfolio-email-form';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally read response JSON/text if your function returns something
      // const data = await response.json();

      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong sending your message. Please try again in a moment.');
    }
  });
});
