$(document).ready(function () {
    /* document.getElementById('rsvpForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        const guestname = document.getElementById('guestname').value;
        const email = document.getElementById('email').value;
        const attend = document.querySelector('input[name="attend"]:checked').value;
        const notes = document.getElementById('notes').value;

        // Aquí podrías hacer una petición AJAX para enviar los datos a un servidor
        console.log({
            guestname,
            email,
            attend,
            notes
        });

        alert('Confirmación enviada!');
    }); */
    const validator = new JustValidate('#rsvpForm', {
        focusInvalidField: false,
        validateBeforeSubmitting: true,
    }); 

    validator
        .addField(document.querySelector('#guestname'), [{
                rule: 'required',
                errorMessage: 'Por favor, ingrese su nombre.',  
                priority: 1,
            },
            {
                validator: (value) => () =>
                    new Promise((resolve) => {
                        const names = ['Esteban CL', 'Lau', 'Estefan']

                        if(value.length) resolve(names.includes(value))
                        resolve(true)
                    }),
                errorMessage: 'Lo sentimos, no estas registrado.',
                priority: 2,
            },
        ])
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
            {
                validator: (value) => () =>
                    new Promise((resolve) => {
                        const names = ['test@test.com', 'Lau', 'Estefan']

                        resolve(names.includes(value))
                    }),
                errorMessage: 'Lo sentimos, no estas registrado.',
                priority: 3,
            },
        ])
        .addRequiredGroup('#attend', 'Por favor, elija una opción.')
        .onSuccess((event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      
            const form = event.target;
            const formData = new FormData(form);
      
            // Convertir los datos a un objeto o JSON si es necesario
            const data = Object.fromEntries(formData);
            console.log(data);
            
            // Ejemplo de envío usando fetch
            /*fetch('/your-endpoint', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch(error => {
              console.error('Error:', error);
            }); */
          });
});