// Hamburger Menu Functionality
class HamburgerMenu {
    constructor() {
        this.isOpen = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.createMenuHTML();
        this.bindEvents();
        this.checkAuthState();
    }

    createMenuHTML() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'hamburger-menu-overlay';
        overlay.id = 'hamburger-menu-overlay';
        document.body.appendChild(overlay);

        // Create menu
        const menu = document.createElement('div');
        menu.className = 'hamburger-menu';
        menu.id = 'hamburger-menu';
        
        // Get current page path to determine active menu item
        const currentPath = window.location.pathname;
        const isHome = currentPath === '/' || currentPath.endsWith('index.html');
        const isDestinations = currentPath.includes('destinations.html');
        const isMarketplace = currentPath.includes('marketplace.html');
        const isContact = currentPath.includes('ContactUs.html');
        const isFAQs = currentPath.includes('FAQs.html');

        menu.innerHTML = `
            <div class="hamburger-menu-header">
                <button class="hamburger-menu-close" id="hamburger-menu-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="hamburger-menu-logo">
                    <img src="${this.getLogoPath()}" alt="Trivel Panama">
                    <span>Trivel Panama</span>
                </div>
            </div>
            
            <nav class="hamburger-menu-nav">
                <ul>
                    <li>
                        <a href="${this.getHomePath()}" class="${isHome ? 'active' : ''}">
                            <i class="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="${this.getDestinationsPath()}" class="${isDestinations ? 'active' : ''}">
                            <i class="fas fa-map-marked-alt"></i>
                            <span>Destinations</span>
                        </a>
                    </li>
                    <li>
                        <a href="${this.getMarketplacePath()}" class="${isMarketplace ? 'active' : ''}">
                            <i class="fas fa-store"></i>
                            <span>ShoreHouse Market Hub</span>
                        </a>
                    </li>
                    <li>
                        <a href="${this.getContactPath()}" class="${isContact ? 'active' : ''}">
                            <i class="fas fa-envelope"></i>
                            <span>Contact Us</span>
                        </a>
                    </li>
                    <li>
                        <a href="${this.getFAQsPath()}" class="${isFAQs ? 'active' : ''}">
                            <i class="fas fa-question-circle"></i>
                            <span>FAQs</span>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div class="hamburger-menu-divider"></div>
            
            <div class="hamburger-menu-account" id="hamburger-menu-account">
                <div class="hamburger-menu-account-title">Account</div>
                <div class="hamburger-menu-account-buttons" id="hamburger-menu-account-buttons">
                    <!-- Account buttons will be populated by checkAuthState -->
                </div>
            </div>
        `;
        
        document.body.appendChild(menu);
    }

    getLogoPath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return '../assets/img/Logo.png';
        }
        return 'assets/img/Logo.png';
    }

    getHomePath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return '../index.html';
        }
        return 'index.html';
    }

    getDestinationsPath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return 'destinations.html';
        }
        return 'pages/destinations.html';
    }

    getMarketplacePath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return 'marketplace.html';
        }
        return 'pages/marketplace.html';
    }

    getContactPath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return 'ContactUs.html';
        }
        return 'pages/ContactUs.html';
    }

    getFAQsPath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return 'FAQs.html';
        }
        return 'pages/FAQs.html';
    }

    bindEvents() {
        // Hamburger button click - try multiple selectors
        const hamburgerBtn = document.querySelector('.hamburger-btn') || 
                           document.querySelector('.hamburger') ||
                           document.querySelector('[class*="hamburger"]');
        
        if (hamburgerBtn) {
            console.log('Hamburger button found:', hamburgerBtn);
            hamburgerBtn.addEventListener('click', () => this.toggleMenu());
        } else {
            console.error('Hamburger button not found');
        }

        // Close button click
        const closeBtn = document.getElementById('hamburger-menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeMenu());
        }

        // Overlay click
        const overlay = document.getElementById('hamburger-menu-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeMenu());
        }

        // ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Prevent body scroll when menu is open
        const menu = document.getElementById('hamburger-menu');
        if (menu) {
            menu.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        }
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        const menu = document.getElementById('hamburger-menu');
        const overlay = document.getElementById('hamburger-menu-overlay');
        const hamburgerBtn = document.querySelector('.hamburger-btn') || 
                           document.querySelector('.hamburger') ||
                           document.querySelector('[class*="hamburger"]');

        if (menu) menu.classList.add('active');
        if (overlay) overlay.classList.add('active');
        if (hamburgerBtn) hamburgerBtn.classList.add('active');

        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.isOpen = false;
        const menu = document.getElementById('hamburger-menu');
        const overlay = document.getElementById('hamburger-menu-overlay');
        const hamburgerBtn = document.querySelector('.hamburger-btn') || 
                           document.querySelector('.hamburger') ||
                           document.querySelector('[class*="hamburger"]');

        if (menu) menu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');

        document.body.style.overflow = '';
    }

    checkAuthState() {
        // Check if Firebase is available
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                this.currentUser = user;
                this.updateAccountSection(user);
            });
        } else {
            // Fallback for when Firebase is not available
            this.updateAccountSection(null);
        }
    }

    updateAccountSection(user) {
        const accountButtons = document.getElementById('hamburger-menu-account-buttons');
        if (!accountButtons) return;

        if (user) {
            // User is logged in
            let displayName = user.displayName || user.email?.substring(0, 5) + '...' || 'Usuario';
            
            // Try to get full name from Firestore
            if (firebase.firestore) {
                firebase.firestore().collection('users').doc(user.uid).get()
                    .then((doc) => {
                        if (doc.exists && doc.data().fullName) {
                            displayName = doc.data().fullName;
                            this.updateUserInfo(displayName, user.email);
                        } else {
                            this.updateUserInfo(displayName, user.email);
                        }
                    })
                    .catch(() => {
                        this.updateUserInfo(displayName, user.email);
                    });
            } else {
                this.updateUserInfo(displayName, user.email);
            }
        } else {
            // User is not logged in
            accountButtons.innerHTML = `
                <a href="${this.getLoginPath()}" class="hamburger-menu-account-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>Iniciar Sesión</span>
                </a>
                <a href="${this.getRegisterPath()}" class="hamburger-menu-account-btn">
                    <i class="fas fa-user-plus"></i>
                    <span>Registrarse</span>
                </a>
            `;
        }
    }

    updateUserInfo(displayName, email) {
        const accountButtons = document.getElementById('hamburger-menu-account-buttons');
        if (!accountButtons) return;

        const userInitial = displayName.charAt(0).toUpperCase();

        accountButtons.innerHTML = `
            <div class="hamburger-menu-user-info">
                <div class="hamburger-menu-user-avatar">
                    ${userInitial}
                </div>
                <div class="hamburger-menu-user-details">
                    <div class="hamburger-menu-user-name">${displayName}</div>
                    <div class="hamburger-menu-user-email">${email || ''}</div>
                </div>
            </div>
            <button class="hamburger-menu-logout" id="hamburger-menu-logout">
                <i class="fas fa-sign-out-alt"></i>
                <span>Cerrar Sesión</span>
            </button>
        `;

        // Add logout event listener
        const logoutBtn = document.getElementById('hamburger-menu-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    logout() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().signOut()
                .then(() => {
                    this.closeMenu();
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        }
    }

    getLoginPath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return 'login.html';
        }
        return 'pages/login.html';
    }

    getRegisterPath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return 'register.html';
        }
        return 'pages/register.html';
    }
}

// Initialize hamburger menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing hamburger menu...');
    new HamburgerMenu();
});
