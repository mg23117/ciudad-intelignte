(function () {
    // Estado global del juego
    const estado = {
        nivelActual: 1,
        // datos compartidos entre niveles
        ubicacion: null,
    };

    // Exponemos el estado global para que otros módulos puedan acceder a él. Cualquiera nivel puede leerlo, pero solo app.js debería modificarlo
    window.GameState = estado;

    const progressBar = document.getElementById('progressBar');
    const btnSiguienteNivel1 = document.getElementById('btnSiguienteNivel1');
    // Botón para pasar del Nivel 2 al Nivel 3
    const btnSiguienteNivel2 = document.getElementById('btnSiguienteNivel2');

    // Función para actualizar la barra de progreso
    function actualizarProgreso(nivel) {
        const porcentaje = ((nivel - 1) / 5) * 100;
        progressBar.style.width = porcentaje + '%';
        progressBar.textContent = Math.round(porcentaje) + '%';
        progressBar.setAttribute('aria-valuenow', porcentaje);
    }

    // Función para avanzar al siguiente nivel
    function avanzarNivel() {

        // NIVEL 1 -> NIVEL 2
        if (estado.nivelActual === 1) {

            if (window.Nivel1 && window.Nivel1.isCompletado()) {

                // Guardamos la ubicación obtenida
                const ubic = window.Nivel1.getUbicacion();

                if (ubic) {
                    estado.ubicacion = ubic;
                    console.log('Ubicación guardada correctamente:', estado.ubicacion);
                }

                // Ocultamos Nivel 1
                document.getElementById('nivel1').classList.add('d-none');

                // Mostramos Nivel 2
                document.getElementById('nivel2').classList.remove('d-none');

                estado.nivelActual = 2;

                actualizarProgreso(2);

                // Inicializamos Nivel 2
                if (window.Nivel2) {
                    window.Nivel2.inicializar();
                }

            } else {
                alert('Aún no has obtenido la ubicación.');
            }
        }

        // =====================================================
        // NIVEL 2 -> NIVEL 3
        // =====================================================
        else if (estado.nivelActual === 2) {

            if (window.Nivel2 && window.Nivel2.isCompletado()) {

                // Ocultamos Nivel 2
                document.getElementById('nivel2').classList.add('d-none');

                // Mostramos Nivel 3
                document.getElementById('nivel3').classList.remove('d-none');

                estado.nivelActual = 3;

                actualizarProgreso(3);

            } else {

                alert('Debes dibujar el mapa y marcar la ubicación.');

            }
        }
    }

    function init() {
        // aqui ocultamos todos los niveles excepto el 1
        document.querySelectorAll('.nivel-section').forEach(el => el.classList.add('d-none'));
        document.getElementById('nivel1').classList.remove('d-none');

        // iniciamos el Nivel 1
        if (window.Nivel1) {
            window.Nivel1.inicializar();
        }

        // Evento para pasar del Nivel 2 al Nivel 3
        if (btnSiguienteNivel2) {

            btnSiguienteNivel2.addEventListener(
                'click',
                avanzarNivel
            );

        }

        //iniciamos el Nivel 4
        if (window.Nivel4) {
            window.Nivel4.inicializar();
    }

        // asignamos el evento al botón "Siguiente nivel" del Nivel 1
        if (btnSiguienteNivel1) {
            btnSiguienteNivel1.addEventListener('click', avanzarNivel);
        }

        actualizarProgreso(1);
    }

    init();
})();