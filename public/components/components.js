// Component Loader Script
class ComponentLoader {
    constructor() {
        this.basePath = this.getBasePath();
    }

    getBasePath() {
        // Determinar si estamos en la raíz o en una subcarpeta
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return '../';
        }
        return './';
    }

    async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
            
            // Ejecutar scripts específicos después de cargar el componente
            if (elementId === 'header-component') {
                this.initializeHeader();
            } else if (elementId === 'footer-component') {
                this.initializeFooter();
            }
        } catch (error) {
            console.error('Error loading component:', error);
            document.getElementById(elementId).innerHTML = `<p>Error loading component: ${error.message}</p>`;
        }
    }

    initializeHeader() {
        // Inicializar funcionalidad específica del header
        this.setupAuthArea();
        this.setupNavigation();
    }

    initializeFooter() {
        // Inicializar funcionalidad específica del footer
        this.setupFooterLinks();
    }

    setupAuthArea() {
        // Configurar el área de autenticación si Firebase está disponible
        if (typeof firebase !== 'undefined') {
            firebase.auth().onAuthStateChanged(async function(user) {
                const authArea = document.getElementById('auth-area');
                if (!authArea) return;
                
                authArea.innerHTML = '';
                if (user) {
                    try {
                        const db = firebase.firestore();
                        const userDoc = await db.collection('users').doc(user.uid).get();
                        let displayName = '';
                        if (userDoc.exists && userDoc.data().fullName) {
                            displayName = userDoc.data().fullName;
                        }
                        if (!displayName) {
                            const email = user.email;
                            let shortEmail = email;
                            if (email.length > 5) {
                                shortEmail = email.substring(0, 5) + '...';
                            }
                            displayName = shortEmail;
                        }
                        authArea.innerHTML = `<span style="font-weight:600;">${displayName}</span> <button id="logout-btn" class="auth-btn" style="margin-left:10px;">Cerrar sesión</button>`;
                        document.getElementById('logout-btn').onclick = function() {
                            firebase.auth().signOut().then(function() {
                                window.location.href = 'login.html';
                            });
                        };
                    } catch (e) {
                        authArea.innerHTML = `<span>${user.email}</span> <button id="logout-btn" class="auth-btn" style="margin-left:10px;">Cerrar sesión</button>`;
                        document.getElementById('logout-btn').onclick = function() {
                            firebase.auth().signOut();
                            window.location.reload();
                        };
                    }
                } else {
                    const loginPath = window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
                    authArea.innerHTML = `<a href="${loginPath}" class="auth-btn">Iniciar Sesión</a>`;
                }
            });
        }
    }

    setupNavigation() {
        // Marcar la página activa en la navegación
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.includes(currentPage) || (currentPage === 'index.html' && href.includes('index.html')))) {
                link.parentElement.classList.add('active');
            }
        });
    }

    setupFooterLinks() {
        // Configurar enlaces del footer según la ubicación actual
        const footerLinks = document.querySelectorAll('.footer-links a');
        const currentPath = window.location.pathname;
        
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                // Enlaces internos - ajustar según la ubicación
                if (currentPath.includes('/pages/')) {
                    link.href = '../index.html' + href;
                }
            }
        });
    }

    // Método para cargar todos los componentes
    async loadAllComponents() {
        await Promise.all([
            this.loadComponent('header-component', this.basePath + 'components/header.html'),
            this.loadComponent('footer-component', this.basePath + 'components/footer.html')
        ]);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const loader = new ComponentLoader();
    loader.loadAllComponents();
});

// Función global para usar desde otras páginas
window.ComponentLoader = ComponentLoader; 