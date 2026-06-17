(function () {
    let ubicacionObtenida = false;
    let latitud = null;
    let longitud = null;

    const btnObtener = document.getElementById("btnObtenerUbicacion");
    const spanLat = document.getElementById('lat');
    const spanLng = document.getElementById('lng');
    const mensajeDiv = document.getElementById('mensajeUbicacion');
    const btnSiguiente = document.getElementById('btnSiguienteNivel1');

    // Función para mostrar mensajes (usando alertas de Bootstrap)
    function mostrarMensaje(texto, tipo = 'info') {
        // tipo: success, danger, warning, info
        const alertClass = `alert alert-${tipo}`;
        mensajeDiv.innerHTML = `<div class="${alertClass}" role="alert">${texto}</div>`;
    }

    function actualizarUbicacion(pos) {
        latitud = pos.coords.latitude;
        longitud = pos.coords.longitude;
        spanLat.textContent = latitud.toFixed(6);
        spanLng.textContent = longitud.toFixed(6);
        ubicacionObtenida = true;
        btnSiguiente.disabled = false;
        mostrarMensaje('Se obtuvo la ubicación de forma correcta. Puedes seguir!', 'success');
    }

    // Para menajar los errores o mensajes que iremos mostrando
    function manejarError(error) {
        let mensaje = "";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                mensaje = 'El permiso fue denegado. Debes permitir el acceso a la ubicación para continuar.';
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = 'La ubicación no está disponible. Intenta de nuevo o activa el GPS.';
                break;
            case error.TIMEOUT:
                mensaje = 'Lo sentimos, el tiempo de espera se acabó. Intentalo de nuevo';
                break;
            default:
                mensaje = `Lo sentimos, ha ocurrido un error desconocido: ${error.message}`;
        }
        mostrarMensaje(mensaje, 'danger');
        btnSiguiente.disabled = true;
    }

    // Es la función para obtener la ubicación
    function obtenerUbicacion() {
        if (!navigator.geolocation) {
            mostrarMensaje('Ha ocurrido un error, tu navegador no soporta geolocalización.', 'danger');
            return;
        }

        mostrarMensaje('Obteniendo ubicación...', 'info');
        btnObtener.disabled = true; // para evitarnos una race condition

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                actualizarUbicacion(pos);
                btnObtener.disabled = false;
            },
            (error) => {
                manejarError(error);
                btnObtener.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    // Asignamos los eventos y exponemos la función de inicialización
    function inicializar() {
        btnObtener.addEventListener('click', obtenerUbicacion);
    }

    // Exponemos una función para que app.js sepa si ya se cumplió el nivel
    // y también para reiniciar si es necesario.
    window.Nivel1 = {
        inicializar: inicializar,
        isCompletado: function () { return ubicacionObtenida; },
        getUbicacion: function () { return ubicacionObtenida ? { lat: latitud, lng: longitud } : null; }
    };

})();