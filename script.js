// Smooth scrolling only - No parallax effect
document.addEventListener('DOMContentLoaded', function () {
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

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible'); // Reset animation when out of view
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
  });

  // Modal functionality
  const modal = document.getElementById('contactModal');
  const contactButtons = document.querySelectorAll('.contact-btn');
  const closeButton = document.querySelector('.modal-close');
  const contactForm = document.getElementById('contactForm');

  // Open modal when clicking contact buttons
  contactButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Reset modal state: show form, hide/remove any previous success message
      if (contactForm) {
        contactForm.style.display = 'flex';
      }
      const existingSuccess = document.querySelector('.contact-success-message');
      if (existingSuccess) {
        existingSuccess.remove();
      }

      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal when clicking close button
  closeButton.addEventListener('click', function () {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when clicking outside the modal content
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

  // Handle form submission
  contactForm.addEventListener('submit', async function (e) {
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

    const endpoint = 'https://worker-proud-breeze-0b51.eldar-jahic-gb.workers.dev/';

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

      // Reset form fields
      contactForm.reset();

      // Hide the form and show an in-modal success message instead of alert
      contactForm.style.display = 'none';

      let successMessage = document.querySelector('.contact-success-message');
      if (!successMessage) {
        successMessage = document.createElement('p');
        successMessage.className = 'contact-success-message';
        successMessage.textContent = 'Thank you for the message, I will get back to you!';

        // Insert after the modal title if possible, otherwise append to modal content
        const modalContent = modal.querySelector('.modal-content');
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle && modalTitle.parentNode) {
          modalTitle.parentNode.insertBefore(successMessage, modalTitle.nextSibling);
        } else if (modalContent) {
          modalContent.appendChild(successMessage);
        }
      }

      successMessage.style.display = 'block';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong sending your message. Please try again in a moment.');
    }
  });
});
