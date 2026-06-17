(function () {
    // Estado global del juego
    const estado = {
        nivelActual: 1,
        // datos compartidos entre niveles
        ubicacion: null,
    };

    const progressBar = document.getElementById('progressBar');
    const btnSiguienteNivel1 = document.getElementById('btnSiguienteNivel1');

    // Función para actualizar la barra de progreso
    function actualizarProgreso(nivel) {
        const porcentaje = ((nivel - 1) / 5) * 100;
        progressBar.style.width = porcentaje + '%';
        progressBar.textContent = Math.round(porcentaje) + '%';
        progressBar.setAttribute('aria-valuenow', porcentaje);
    }

    // Función para avanzar al siguiente nivel
    function avanzarNivel() {
        if (estado.nivelActual === 1) {
            // Verificar si el Nivel 1 está completado
            if (window.Nivel1 && window.Nivel1.isCompletado()) {

                // Guardamos la ubicación en el estado global
                const ubic = window.Nivel1.getUbicacion();
                if (ubic) {
                    estado.ubicacion = ubic;
                    console.log('Ubicación guardada correctamente:', estado.ubicacion);
                }
                // Pasamos al nivel 2 (ocultamos nivel y mostramos nivel2)
                document.getElementById('nivel1').classList.add('d-none');
                document.getElementById('nivel2').classList.remove('d-none');
                estado.nivelActual = 2;
                actualizarProgreso(2);
                // if (window.Nivel2) window.Nivel2.inicializar();
            } else {
                alert('Aún no has obtenido la ubicación. Completa el nivel primero!');
            }
        }
        // TODO: Añadir más cosas cuando haya más niveles aquí
    }

    function init() {
        // aqui ocultamos todos los niveles excepto el 1
        document.querySelectorAll('.nivel-section').forEach(el => el.classList.add('d-none'));
        document.getElementById('nivel1').classList.remove('d-none');

        // iniciamos el Nivel 1
        if (window.Nivel1) {
            window.Nivel1.inicializar();
        }

        // asignamos el evento al botón "Siguiente nivel" del Nivel 1
        if (btnSiguienteNivel1) {
            btnSiguienteNivel1.addEventListener('click', avanzarNivel);
        }

        actualizarProgreso(1);
    }

    init();
})();