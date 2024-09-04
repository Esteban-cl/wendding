$(document).ready(function () {
    const validator = new JustValidate('#rsvpForm', {
        focusInvalidField: false,
        validateBeforeSubmitting: true,
    });

    validator
        .addField(document.querySelector('#guestname'), [{
            rule: 'required',
            errorMessage: 'Por favor, ingrese su nombre.',
            priority: 1,
        }, ])
        .addField(document.querySelector('#email'), [{
                rule: 'required',
                errorMessage: 'Por favor, ingrese su correo.',
                priority: 1,
            },
            {
                rule: 'email',
                errorMessage: 'Por favor, ingrese un correo valido.',
                priority: 2,
            },
        ])
        .addRequiredGroup('#attend', 'Por favor, elija una opción.')
        .onSuccess((event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

            const form = event.target;
            const formData = new FormData(form);

            // Convertir los datos a un objeto o JSON si es necesario
            const data = Object.fromEntries(formData);

            // Enviar la confirmación a la API
            fetch('http://localhost:3000/api/rsvp', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data) {
                        return toastr.success('Confirmación enviada correctamente.');
                    }
                    return toastr.error('Error al enviar la confirmación.');
                })
                .catch(error => {
                    toastr.error('Error al enviar la confirmación.');
                    console.log('Error:', error);
                });
        });
});