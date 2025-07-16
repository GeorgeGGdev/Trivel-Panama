const isLoginPage = window.location.pathname.includes('login.html');
const form = document.getElementById(isLoginPage ? 'loginForm' : 'registerForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isLoginPage) {
            await handleLogin();
        } else {
            await handleRegistration();
        }
    });
}

async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        showMessage('¡Inicio de sesión exitoso!', 'success');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1200);
    } catch (error) {
        let msg = 'Error al iniciar sesión.';
        if (error.code === 'auth/user-not-found') msg = 'Usuario no encontrado.';
        if (error.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
        if (error.code === 'auth/invalid-email') msg = 'Correo inválido.';
        showMessage(msg, 'error');
    }
}

async function handleRegistration() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showMessage('Las contraseñas no coinciden', 'error');
        return;
    }
    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        showMessage('¡Registro exitoso!', 'success');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1200);
    } catch (error) {
        let msg = 'Error al registrar.';
        if (error.code === 'auth/email-already-in-use') msg = 'El correo ya está en uso.';
        if (error.code === 'auth/invalid-email') msg = 'Correo inválido.';
        showMessage(msg, 'error');
    }
}

function showMessage(message, type) {
    let messageElement = document.querySelector('.message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'message';
        document.querySelector('.form-container').insertBefore(
            messageElement,
            document.querySelector('.form-footer')
        );
    }
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
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
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

firebase.auth().onAuthStateChanged((user) => {
    if (user && isLoginPage) {
        window.location.href = '../index.html';
    }
}); 