document.addEventListener('DOMContentLoaded', () => {
    // Get the current form based on the page
    const isLoginPage = window.location.pathname.includes('login.html');
    const form = document.getElementById(isLoginPage ? 'loginForm' : 'registerForm');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (isLoginPage) {
                handleLogin();
            } else {
                handleRegistration();
            }
        });
    }
});

async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    try {
        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password, remember });
        
        // For demonstration, we'll just show a success message
        showMessage('Iniciando sesión...', 'success');
        
        // Redirect to home page after successful login
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1500);
    } catch (error) {
        showMessage('Error al iniciar sesión. Por favor, intenta de nuevo.', 'error');
    }
}

async function handleRegistration() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (password !== confirmPassword) {
        showMessage('Las contraseñas no coinciden', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    try {
        // Here you would typically make an API call to your backend
        console.log('Registration attempt:', { fullName, email, password });
        
        // For demonstration, we'll just show a success message
        showMessage('¡Registro exitoso!', 'success');
        
        // Redirect to login page after successful registration
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    } catch (error) {
        showMessage('Error al registrar. Por favor, intenta de nuevo.', 'error');
    }
}

function showMessage(message, type) {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'message';
        document.querySelector('.form-container').insertBefore(
            messageElement,
            document.querySelector('.form-footer')
        );
    }

    // Set message content and style
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    
    // Add styles for the message
    messageElement.style.padding = '10px';
    messageElement.style.margin = '10px 0';
    messageElement.style.borderRadius = '4px';
    messageElement.style.textAlign = 'center';
    messageElement.style.fontSize = '14px';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.border = '1px solid #c3e6cb';
    } else {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#721c24';
        messageElement.style.border = '1px solid #f5c6cb';
    }

    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
} 