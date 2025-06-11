// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
    
    // Modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeSuccessModal);
    }
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('show')) {
            closeSuccessModal();
        }
    });
    
    // Social media links functionality
    setupSocialLinks();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Form animations
    setupFormAnimations();
});

// Form submission handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);
    
    // Validate all fields
    if (!validateForm(formObject)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        showSuccessModal();
        
        // Log form data (for development)
        console.log('Form submitted:', formObject);
        
    }, 2000);
}

// Form validation
function validateForm(data) {
    let isValid = true;
    const errors = {};
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Por favor ingresa un correo electrónico válido';
        isValid = false;
    }
    
    // Phone validation (optional)
    if (data.phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            errors.phone = 'Por favor ingresa un número de teléfono válido';
            isValid = false;
        }
    }
    
    // Subject validation
    if (!data.subject) {
        errors.subject = 'Por favor selecciona un asunto';
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.message = 'El mensaje debe tener al menos 10 caracteres';
        isValid = false;
    }
    
    // Display errors
    Object.keys(errors).forEach(fieldName => {
        showFieldError(fieldName, errors[fieldName]);
    });
    
    return isValid;
}

// Field validation
function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const value = field.value.trim();
    
    let error = '';
    
    switch (fieldName) {
        case 'name':
            if (!value || value.length < 2) {
                error = 'El nombre debe tener al menos 2 caracteres';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                error = 'Por favor ingresa un correo electrónico válido';
            }
            break;
            
        case 'phone':
            if (value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    error = 'Por favor ingresa un número de teléfono válido';
                }
            }
            break;
            
        case 'subject':
            if (!value) {
                error = 'Por favor selecciona un asunto';
            }
            break;
            
        case 'message':
            if (!value || value.length < 10) {
                error = 'El mensaje debe tener al menos 10 caracteres';
            }
            break;
    }
    
    if (error) {
        showFieldError(fieldName, error);
    } else {
        clearFieldError(e);
    }
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    // Remove existing error
    clearFieldError({ target: field });
    
    // Add error class
    field.classList.add('error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.3s ease;
    `;
    
    // Insert error message
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const fieldName = field.name;
    
    // Remove error class
    field.classList.remove('error');
    
    // Remove error message
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Show success modal
function showSuccessModal() {
    if (successModal) {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            closeSuccessModal();
        }, 5000);
    }
}

// Close success modal
function closeSuccessModal() {
    if (successModal) {
        successModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Setup social media links
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track social media clicks (analytics)
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                           this.classList.contains('instagram') ? 'Instagram' :
                           this.classList.contains('tiktok') ? 'TikTok' :
                           this.classList.contains('whatsapp') ? 'WhatsApp' : 'Unknown';
            
            console.log(`Social media click: ${platform}`);
        });
    });
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup form animations
function setupFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    // Stagger animation for form groups
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Floating animation for info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 * index);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for error states
const errorStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .error-message {
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .modal.show {
        display: flex;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

// Inject error styles
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet); 