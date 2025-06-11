// FAQs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ elements
    const navTabs = document.querySelectorAll('.nav-tab');
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize FAQ functionality
    initializeFAQs();
    
    // Setup navigation tabs
    setupNavigationTabs();
    
    // Setup FAQ accordion
    setupFAQAccordion();
    
    // Setup search functionality (if search input exists)
    setupSearchFunctionality();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup animations
    setupAnimations();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
});

// Initialize FAQ functionality
function initializeFAQs() {
    // Show first category by default
    const firstCategory = document.querySelector('.faq-category');
    const firstTab = document.querySelector('.nav-tab');
    
    if (firstCategory && firstTab) {
        firstCategory.classList.add('active');
        firstTab.classList.add('active');
    }
    
    // Add loading animation
    addLoadingAnimation();
}

// Setup navigation tabs
function setupNavigationTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active category
            faqCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category) {
                    cat.classList.add('active');
                    
                    // Animate category transition
                    cat.style.opacity = '0';
                    cat.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        cat.style.transition = 'all 0.5s ease';
                        cat.style.opacity = '1';
                        cat.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
            
            // Update URL hash
            updateURLHash(category);
            
            // Track tab clicks (analytics)
            console.log(`FAQ category clicked: ${category}`);
        });
    });
}

// Setup FAQ accordion
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
                
                // Scroll to item if it's not fully visible
                setTimeout(() => {
                    const rect = item.getBoundingClientRect();
                    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    if (!isVisible) {
                        item.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 300);
            }
            
            // Track FAQ interactions (analytics)
            const questionText = this.querySelector('h3').textContent;
            console.log(`FAQ interaction: ${questionText}`);
        });
        
        // Add keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make question focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when toggled
        question.addEventListener('click', function() {
            const isExpanded = item.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded.toString());
        });
    });
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    const searchIcon = document.querySelector('.search-icon');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategories = document.querySelectorAll('.faq-category');
    const navTabs = document.querySelectorAll('.nav-tab');
    
    // Add search input if it doesn't exist
    if (!searchInput) {
        addSearchInput();
    }
    
    // Debounced search function
    const debouncedSearch = debounce(function(searchTerm) {
        performSearch(searchTerm, faqItems, faqCategories, navTabs);
    }, 300);
    
    // Search input event listener
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        debouncedSearch(searchTerm);
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.dispatchEvent(new Event('input'));
        }
    });
}

// Add search input to page
function addSearchInput() {
    const faqNavigation = document.querySelector('.faq-navigation .container');
    if (!faqNavigation) return;
    
    const searchHTML = `
        <div class="faq-search">
            <i class="fas fa-search search-icon"></i>
            <input type="text" class="search-input" placeholder="Buscar en preguntas frecuentes...">
        </div>
    `;
    
    faqNavigation.insertAdjacentHTML('beforeend', searchHTML);
}

// Perform search
function performSearch(searchTerm, faqItems, faqCategories, navTabs) {
    let hasResults = false;
    let visibleItems = 0;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        const matches = question.includes(searchTerm) || answer.includes(searchTerm);
        
        if (matches) {
            item.style.display = 'block';
            item.style.opacity = '1';
            hasResults = true;
            visibleItems++;
            
            // Highlight search term
            if (searchTerm) {
                highlightSearchTerm(item, searchTerm);
            }
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
    
    // Update category visibility
    faqCategories.forEach(category => {
        const categoryItems = category.querySelectorAll('.faq-item');
        const visibleCategoryItems = Array.from(categoryItems).filter(item => 
            item.style.display !== 'none'
        );
        
        if (visibleCategoryItems.length > 0) {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    showNoResultsMessage(!hasResults);
    
    // Update counter
    updateSearchCounter(visibleItems, faqItems.length);
}

// Highlight search terms
function highlightSearchTerm(item, searchTerm) {
    const question = item.querySelector('.faq-question h3');
    const answer = item.querySelector('.faq-answer p');
    
    // Remove existing highlights
    question.innerHTML = question.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
    answer.innerHTML = answer.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
    
    // Add new highlights
    const questionRegex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    const answerRegex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    
    question.innerHTML = question.innerHTML.replace(questionRegex, '<mark class="search-highlight">$1</mark>');
    answer.innerHTML = answer.innerHTML.replace(answerRegex, '<mark class="search-highlight">$1</mark>');
}

// Escape regex special characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Show/hide no results message
function showNoResultsMessage(show) {
    let noResults = document.querySelector('.no-results');
    
    if (show && !noResults) {
        noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No se encontraron resultados</h3>
            <p>Intenta con otros términos de búsqueda o consulta nuestras categorías.</p>
        `;
        
        const faqContent = document.querySelector('.faq-content .container');
        if (faqContent) {
            faqContent.appendChild(noResults);
        }
    } else if (!show && noResults) {
        noResults.remove();
    }
}

// Update search counter
function updateSearchCounter(visible, total) {
    let counter = document.querySelector('.faq-counter');
    
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'faq-counter';
        const faqContent = document.querySelector('.faq-content .container');
        if (faqContent) {
            faqContent.insertBefore(counter, faqContent.firstChild);
        }
    }
    
    counter.textContent = `Mostrando ${visible} de ${total} preguntas`;
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

// Setup animations
function setupAnimations() {
    // Animate FAQ items on load
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Animate navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach((tab, index) => {
        tab.style.opacity = '0';
        tab.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            tab.style.transition = 'all 0.5s ease';
            tab.style.opacity = '1';
            tab.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    const faqItems = document.querySelectorAll('.faq-item');
    const navTabs = document.querySelectorAll('.nav-tab');
    
    // Keyboard navigation for FAQ items
    document.addEventListener('keydown', function(e) {
        const activeElement = document.activeElement;
        
        if (activeElement.classList.contains('faq-question')) {
            const currentItem = activeElement.closest('.faq-item');
            const currentIndex = Array.from(faqItems).indexOf(currentItem);
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < faqItems.length - 1) {
                        faqItems[currentIndex + 1].querySelector('.faq-question').focus();
                    }
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        faqItems[currentIndex - 1].querySelector('.faq-question').focus();
                    }
                    break;
            }
        }
    });
}

// Update URL hash
function updateURLHash(category) {
    if (history.pushState) {
        history.pushState(null, null, `#${category}`);
    } else {
        location.hash = `#${category}`;
    }
}

// Add loading animation
function addLoadingAnimation() {
    const faqContent = document.querySelector('.faq-content .container');
    if (!faqContent) return;
    
    const loading = document.createElement('div');
    loading.className = 'faq-loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    
    faqContent.appendChild(loading);
    
    // Remove loading after content loads
    setTimeout(() => {
        loading.remove();
    }, 1000);
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

// Add CSS for search highlighting
const searchStyles = `
    .search-highlight {
        background: #fff3cd;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: 600;
    }
    
    .faq-search {
        max-width: 600px;
        margin: 0 auto 3rem;
        position: relative;
    }
    
    .search-input {
        width: 100%;
        padding: 1rem 1.5rem;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 1rem;
        transition: var(--transition);
        padding-left: 3rem;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
    }
    
    .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
        font-size: 1.2rem;
    }
    
    .faq-counter {
        text-align: center;
        margin-bottom: 2rem;
        color: #666;
        font-size: 0.9rem;
    }
    
    .no-results {
        text-align: center;
        padding: 3rem;
        color: #666;
    }
    
    .no-results i {
        font-size: 4rem;
        color: #ddd;
        margin-bottom: 1rem;
    }
    
    .no-results h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--text-color);
    }
    
    .no-results p {
        margin-bottom: 2rem;
    }
    
    .faq-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3rem;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject search styles
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet); 