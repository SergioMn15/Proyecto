document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;

    try {
        // API_URL viene de tu archivo config.js
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telefono, password })
        });

        const data = await response.json();

        if (data.success) {
            // Guardamos al usuario en la memoria del navegador
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

            // Redirección por rol
            if (data.usuario.rol === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'cliente.html';
            }
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error conectando a Render:", error);
        alert("No se pudo conectar con el servidor en la nube.");
    }
});