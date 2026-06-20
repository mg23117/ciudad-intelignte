(function(){
    // VARIABLES DEL NIVEL
    // Indica si el mapa ya fue dibujado
    let mapaDibujado = false;

    // Indica si la ubicación fue marcada en el mapa
    let ubicacionMarcada = false;

    // Referencias a elementos HTML
    const canvas = document.getElementById('mapCanvas');
    const btnDibujarMapa = document.getElementById('btnDibujarMapa');
    const mensajeDiv = document.getElementById('mensajeNivel2');
    // Botón para avanzar al siguiente nivel    
    const btnSiguienteNivel2 = document.getElementById('btnSiguienteNivel2');
    
    // Contexto de dibujo del canvas. Es el "lápiz" que se usará para dibujar
    const ctx = canvas.getContext('2d');

    // FUNCIONES AUXILIARES
    // Muestra mensajes Bootstrap en pantalla
    function mostrarMensaje(texto, tipo = 'info') {
        mensajeDiv.innerHTML = `
            <div class="alert alert-${tipo}" role="alert">
                ${texto}
            </div>
        `;
    }

    // Limpia todo el canvas antes de volver a dibujar
    function limpiarCanvas(){
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        )
    }

    //Función temporal. Más adelante aquí dibujaremos el mapa
    // Función par dibujar el mapa
    function dibujarMapa(){
        // Limpiamos dibujos anteriores
        limpiarCanvas();

        // RECTÁNGULO PRINCIPAL DEL MAPA
        ctx.strokeStyle= '#b388ff';
        ctx.lineWidth = 3;
        
        ctx.strokeRect(
            50,   // x
            50,   // y
            600,  // ancho
            300   // alto
        );

        // Título del mapa
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial';

        ctx.fillText(
            'MAPA DE LA CIUDAD INTELIGENTE',
            180,
            35
        );

        // EDIFICIO 1
        ctx.fillStyle = '#7e4ad0';
        ctx.fillRect(
            100,
            100,
            80,
            60
        );

        // Etiqueta
        ctx.fillStyle = '#ffffff';

        ctx.font = '14px Arial';

        ctx.fillText(
            'Edificio 1',
            90,
            180
        );

        // CÍRCULO (CENTRO DE CONTROL)

        // Comenzamos una nueva figura
        ctx.beginPath();

        ctx.arc(
            350, // posición X del centro
            120, // posición Y del centro
            20,  // radio
            0,   // ángulo inicial
            Math.PI * 2 // vuelta completa
        );

        // Color del borde
        ctx.strokeStyle = '#ff6bff';

        // Grosor del borde
        ctx.lineWidth = 3;

        // Dibujamos el borde
        ctx.stroke();

        // Etiqueta
        ctx.fillStyle = '#ffffff';

        ctx.fillText(
            'Centro de Control',
            380,
            125
        );

        // LÍNEA (RUTA PRINCIPAL)
        // Comenzamos un nuevo dibujo
        ctx.beginPath();

        // Punto inicial
        ctx.moveTo(350, 140);

        // Punto final
        ctx.lineTo(350, 280);

        // Color de la línea
        ctx.strokeStyle = '#00e5ff';

        // Grosor
        ctx.lineWidth = 4;

        // Dibujar
        ctx.stroke();

        // Etiqueta
        ctx.fillStyle = '#ffffff';

        ctx.fillText(
            'Ruta Principal',
            370,
            220
        );

        // UBICACIÓN DEL USUARIO
        // Recuperamos la ubicación guardada por el Nivel 1
        const ubicacion = window.GameState.ubicacion;

        // Verificamos que exista
        if (ubicacion) {

            ubicacionMarcada = true;

            // Posición fija debajo de la ruta principal
            const x = 350;
            const y = 310;

            // Dibujamos el marcador del usuario
            ctx.beginPath();

            ctx.arc(
                x,
                y,
                8,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = 'red';

            ctx.fill();

            // Etiqueta
            ctx.fillStyle = '#ffffff';

            ctx.fillText(
                'Tu ubicación',
                x + 15,
                y
            );

            ctx.fillText(
                `Latitud: ${ubicacion.lat.toFixed(4)} | Longitud: ${ubicacion.lng.toFixed(4)}`,
                x + 15,
                y + 20
            );
        }

        mostrarMensaje(
            'Mapa generado correctamente. Puedes seguir!',
            'success'
        );

        // Marcamos el nivel como completado
        mapaDibujado = true;

        // Si mapa y ubicación existen habilitamos el botón
        if (mapaDibujado && ubicacionMarcada) {

            btnSiguienteNivel2.disabled = false;

        }
    }

    // INICIALIZACIÓN
    // Asignamos los eventos y exponemos la función de inicialización
    function inicializar (){
        btnDibujarMapa.addEventListener('click', dibujarMapa);
    }

    // API PÚBLICA DEL NIVEL
    window.Nivel2 = {
        inicializar: inicializar,

        isCompletado: function () {
            return mapaDibujado && ubicacionMarcada;
        }
    };

})(); 