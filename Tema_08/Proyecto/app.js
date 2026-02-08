document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();

    document.getElementById("formulario").addEventListener("submit", e => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const movil = document.getElementById("movil").value;

        // Validar móvil (9 dígitos)
        const movilRegex = /^[0-9]{9}$/;
        if (!movilRegex.test(movil)) {
            alert("El móvil debe tener 9 dígitos");
            return;
        }

        fetch("servidor.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                accion: "insertar",
                nombre,
                email,
                movil
            })
        })
        .then(res => res.json())
        .then(() => {
            document.getElementById("formulario").reset();
            cargarDatos();
        });
    });
});

function cargarDatos() {
    fetch("servidor.php")
        .then(res => res.json())
        .then(datos => {
            let html = "";
            datos.forEach(p => {
                html += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nombre}</td>
                        <td>${p.email}</td>
                        <td>${p.movil}</td>
                    </tr>
                `;
            });
            document.getElementById("tabla").innerHTML = html;
        });
}
