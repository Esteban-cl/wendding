// Configuración de front-flex.js
var panelsStyles = {
    "fullContainer": "body",
    "stretchRows": "1"
};

// Configuración de Pace.js
paceOptions = {
    target: '#preloader .preloader-content'
};

function iniciarAudio() {
    const audioContext = new window.AudioContext()
    const iframeElement = document.getElementById('soundcloud-iframe');
    const widget = SC.Widget(iframeElement)
    
    widget.bind(SC.Widget.Events.READY, function() {
        widget.setVolume(5)
        widget.seekTo(5000) 
    })

    if (audioContext.state === 'suspended') {
        const options = {
            closeButton: true,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "0", // 5000 milisegundos
            extendedTimeOut: "0", // 1000 milisegundos
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            "onclick": function () {
                widget.play();
                toastr.success('El sonido ha sido activado. Puedes desactivarlo el boton inferior izquierdo.', 'Sonido Activado');
            }
        };
        toastr.info('Quieres activar el sonido? Da click en esta alerta.', 'Activar Sonido', options);
    }
}

$(document).ready(function () {
    document.getElementById("ak_js_1").setAttribute("value", (new Date()).getTime());
    document.body.className = document.body.className.replace("siteorigin-panels-before-js", "");

    iniciarAudio();

    // Configuración de toastr.js
    toastr.options = {
        'closeButton': true,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-top-right',
        'preventDuplicates': false,
        'showDuration': '1000',
        'hideDuration': '1000',
        'timeOut': '5000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut',
    }

});