(function () {

    // Referencia al botón final
    const btnFinalizarJuego =
        document.getElementById('btnFinalizarJuego');

    // Función de inicialización
    function inicializar() {

        if (btnFinalizarJuego) {

            btnFinalizarJuego.addEventListener(
                'click',
                function () {
                    alert('🎉 Felicidades. Has restaurado el acceso a la Ciudad Inteligente.');
                }
            );

        }

    }

    // API pública del nivel
    window.Nivel5 = {
        inicializar: inicializar
    };

})();