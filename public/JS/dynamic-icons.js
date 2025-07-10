// Dynamic Icons JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Floating Icons Parallax Effect
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingIcons.forEach(icon => {
            const speed = parseFloat(icon.getAttribute('data-speed')) || 1;
            const x = (mouseX - 0.5) * speed * 30;
            const y = (mouseY - 0.5) * speed * 30;
            
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Icon Loading Animation
    function addLoadingAnimation() {
        const icons = document.querySelectorAll('.stat-icon, .newsletter-icon, .card-icon');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('icon-loading');
                    setTimeout(() => {
                        entry.target.classList.remove('icon-loading');
                    }, 1500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        icons.forEach(icon => observer.observe(icon));
    }
    
    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Icon Hover Effects
    function addHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.card-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.card-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.cta-button, .learn-more, .subscribe-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.animation = 'pulse 0.5s ease';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.animation = '';
                }
            });
        });
    }
    
    // Random Icon Animation
    function randomIconAnimation() {
        const icons = document.querySelectorAll('.floating-icon');
        
        setInterval(() => {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            randomIcon.style.animation = 'none';
            randomIcon.offsetHeight; // Trigger reflow
            randomIcon.style.animation = 'float 3s ease-in-out';
            
            // Add subtle glow effect
            randomIcon.style.filter = 'brightness(1.3) drop-shadow(0 0 8px rgba(255,255,255,0.6))';
            setTimeout(() => {
                randomIcon.style.filter = '';
            }, 3000);
        }, 4000);
    }
    
    // Newsletter Form Enhancement
    function enhanceNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                const icon = this.parentElement.querySelector('i');
                if (icon) {
                    icon.style.color = '#1a73e8';
                    icon.style.transform = 'scale(1.2)';
                }
            });
            
            input.addEventListener('blur', function() {
                const icon = this.parentElement.querySelector('i');
                if (icon) {
                    icon.style.color = '#666';
                    icon.style.transform = 'scale(1)';
                }
            });
        });
        
        // Form submission animation
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.subscribe-btn');
            const icon = submitBtn.querySelector('i');
            
            // Loading animation
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Subscribe Now</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Social Media Icons Enhancement
    function enhanceSocialIcons() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                const iconElement = this.querySelector('i');
                if (iconElement) {
                    iconElement.style.animation = 'bounce 0.6s ease';
                }
                
                // Add tooltip effect
                const title = this.getAttribute('title');
                if (title) {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = title;
                    tooltip.style.cssText = `
                        position: absolute;
                        background: rgba(0,0,0,0.8);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        font-size: 12px;
                        white-space: nowrap;
                        z-index: 1000;
                        top: -40px;
                        left: 50%;
                        transform: translateX(-50%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    `;
                    this.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.style.opacity = '1';
                    }, 10);
                }
            });
            
            icon.addEventListener('mouseleave', function() {
                const iconElement = this.querySelector('i');
                if (iconElement) {
                    iconElement.style.animation = '';
                }
                
                // Remove tooltip
                const tooltip = this.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
    
    // Contact Info Enhancement
    function enhanceContactInfo() {
        const infoItems = document.querySelectorAll('.info-item');
        
        infoItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.info-icon');
                if (icon) {
                    icon.style.animation = 'pulse 0.5s ease';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.info-icon');
                if (icon) {
                    icon.style.animation = '';
                }
            });
            
            // Add click to copy functionality
            item.addEventListener('click', function() {
                const text = this.querySelector('p').textContent;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.textContent = 'Copied to clipboard!';
                        successMsg.style.cssText = `
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background: #28a745;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 5px;
                            z-index: 1000;
                            animation: slideIn 0.3s ease;
                        `;
                        document.body.appendChild(successMsg);
                        
                        setTimeout(() => {
                            successMsg.remove();
                        }, 2000);
                    });
                }
            });
        });
    }
    
    // Initialize all functions
    addLoadingAnimation();
    animateCounters();
    addHoverEffects();
    randomIconAnimation();
    enhanceNewsletterForm();
    enhanceSocialIcons();
    enhanceContactInfo();
    
    // Add scroll-triggered animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.floating-icons');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add click effects to icons
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'I' || e.target.closest('i')) {
            const icon = e.target.tagName === 'I' ? e.target : e.target.closest('i');
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = icon.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            icon.parentElement.style.position = 'relative';
            icon.parentElement.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export functions for potential reuse
window.DynamicIcons = {
    addLoadingAnimation,
    animateCounters,
    addHoverEffects,
    randomIconAnimation,
    enhanceNewsletterForm,
    enhanceSocialIcons,
    enhanceContactInfo
}; 