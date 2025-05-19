// assets/js/contact.js - Client-side form handling
document.addEventListener('DOMContentLoaded', function() {
    // Select the contact form - adjust the selector if needed
    const contactForm = document.querySelector('.php-email-form');
    
    if (contactForm) {
      // Replace the default form submission
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form fields - adjust selectors to match your form structure
        const name = contactForm.querySelector('[name="name"]').value;
        const email = contactForm.querySelector('[name="email"]').value;
        const subject = contactForm.querySelector('[name="subject"]').value;
        const message = contactForm.querySelector('[name="message"]').value;
        
        // Validate form inputs
        if (!name || !email || !subject || !message) {
          displayFormMessage(contactForm, 'Please fill in all fields', 'error');
          return;
        }
        
        if (!isValidEmail(email)) {
          displayFormMessage(contactForm, 'Please enter a valid email address', 'error');
          return;
        }
        
        // Show loading message
        displayFormMessage(contactForm, 'Loading. Please wait...', 'loading');
        
        try {
          // Send email using EmailJS
          const response = await emailjs.send(
            'service_2mw08ur', // Replace with your EmailJS service ID
            'template_yk8mg4j', // Replace with your EmailJS template ID
            {
              from_name: name,
              from_email: email,
              subject: subject,
              message: message,
              to_email: 'fwzanricowork@gmail.com'
            }
          );
          
          if (response.status === 200) {
            // Success message
            displayFormMessage(contactForm, 'Your message has been sent. Thank you!', 'success');
            contactForm.reset();
          } else {
            throw new Error('Failed to send message');
          }
        } catch (error) {
          console.error('Error sending form:', error);
          displayFormMessage(contactForm, 'There was an error sending your message. Please try again later.', 'error');
        }
      });
    }
    
    // Helper functions
    function displayFormMessage(form, message, type) {
      // Try to find existing message div
      let messageDiv = form.querySelector('.sent-message, .error-message, .loading');
      
      // If no message div exists, create one
      if (!messageDiv) {
        messageDiv = document.createElement('div');
        form.appendChild(messageDiv);
      }
      
      // Reset all possible state classes
      messageDiv.classList.remove('sent-message', 'error-message', 'loading');
      
      // Set the appropriate class and message
      switch (type) {
        case 'success':
          messageDiv.classList.add('sent-message');
          break;
        case 'error':
          messageDiv.classList.add('error-message');
          break;
        case 'loading':
          messageDiv.classList.add('loading');
          break;
      }
      
      messageDiv.textContent = message;
      messageDiv.style.display = 'block';
      
      // Hide message after 5 seconds for success/error (not for loading)
      if (type !== 'loading') {
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 5000);
      }
    }
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });