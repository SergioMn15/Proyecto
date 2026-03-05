document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('regNombre').value;
    const telefono = document.getElementById('regTelefono').value;
    const password = document.getElementById('regPass').value;

    try {
        const res = await fetch(`${API_URL}/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, password })
        });
        const data = await res.json();
        if (data.success) {
            alert("¡Registro exitoso! Ya puedes iniciar sesión.");
            window.location.href = 'login.html';
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor.");
    }
});