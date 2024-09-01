window.addEventListener('load', function () {

    function adjustZoomForDevice() {
        // Obtén el ancho de la ventana
        const width = window.innerWidth;
    
        // Define los niveles de zoom para diferentes tamaños de pantalla
        let zoomLevel;
        if (width < 600) {
            zoomLevel = 10; // Nivel de zoom para pantallas móviles
        } else if (width < 900) {
            zoomLevel = 11; // Nivel de zoom para tablets
        } else {
            zoomLevel = 12; // Nivel de zoom para pantallas de escritorio
        }

        // Ajusta el zoom del mapa
        map.setZoom(zoomLevel);
    }

    const element = document.getElementsByClassName('jackrose-sow-maplibre')[0]
    const id = element.getAttribute('data-jackrose-target');

    const map = new maplibregl.Map({
        container: id,
        style: './js/styleMap.json',
        center: [-75.42978887703167, 6.120593055174143],
        zoom: 12,
        minZoom: 5,
        maxZoom: 20
    });

    // Disable scroll zoom
    map.scrollZoom.disable();

    map.on('load', function () {

        adjustZoomForDevice()

        // Función para el zoom con Shift + scroll
        function handleZoomWithShift(event) {
            if (event.shiftKey) { // Verifica si la tecla Shift está presionada
                event.preventDefault(); // Prevenir el comportamiento por defecto del scroll
                var zoomDelta = event.deltaY < 0 ? 1 : -1; // Determina la dirección del zoom (acercar o alejar)
                var zoomLevel = map.getZoom() + zoomDelta * 0.5; // Ajusta el zoom
                map.setZoom(zoomLevel); // Establece el nuevo nivel de zoom
            }
        }

        // Añade el evento wheel al mapa
        map.getCanvas().addEventListener('wheel', handleZoomWithShift);
    });

    // Add default zoom controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add markers
    const markers = [{
            position: [-75.44781254611937, 6.144216326644853], // [longitude, latitude]
            iconUrl: './img/map/map-ceremony.png', // URL del icono del marcador
            url: 'https://maps.app.goo.gl/TE4oA6kNkwxVZsAb7', // URL a abrir en _blank
            contentTooltip: `<h4 class="jackrose-sow-events-grid-item-title typography-heading" style="margin: 0 !important">Ceremonia</h4><div class="jackrose-sow-events-grid-item-description" style="color: #888; margin-top: 2px !important"><p>Parroquia Nuestra Señora de Chiquinquirá.</p></div>`
        },
        {
            position: [-75.4262927716623, 6.084268259625356], // [longitude, latitude]
            iconUrl: './img/map/map-party.png', // URL del icono del marcador
            url: 'https://maps.app.goo.gl/nfxNBEwXwwKsyuCe6', // URL a abrir en _blank
            contentTooltip: `<h4 class="jackrose-sow-events-grid-item-title typography-heading" style="margin: 0 !important">Recepción</h4><div class="jackrose-sow-events-grid-item-description" style="color: #888; margin-top: 2px !important"><p>Imperial Eventos Campestre.</p></div>`
        }
    ];

    markers.forEach(function (marker) {
        new maplibregl.Marker({
                element: createMarkerElement(marker?.iconUrl, marker?.contentTooltip)
            })
            .setLngLat(marker.position)
            .addTo(map)
            .getElement()
            .addEventListener('click', function () {
                window.open(marker.url, '_blank');
            });
    });

    function createMarkerElement(iconUrl = './img/map/map-ceremony.png', contentTooltip) {
        const el = document.createElement('div');
        if (contentTooltip) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerHTML = contentTooltip;
            el.appendChild(tooltip);
        }

        el.className = 'mapboxgl-marker';
        el.style.backgroundImage = 'url(' + iconUrl + ')';
        el.style.backgroundSize = 'contain';
        el.style.cursor = 'pointer';
        el.style.width = '60px'; // Tamaño del marcador
        el.style.height = '70px'; // Tamaño del marcador
        return el;
    }

    window.addEventListener('resize', adjustZoomForDevice);
})