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
            
            // Enviar la confirmación
            const number = 573043457768;
            const check = data.attend === 'Sí, estaré allí' ? true : false;
            const text1 = `Querid@,

Muchas gracias por la invitación a tu boda. Me llena de alegría poder acompañarte en este día tan especial. Con todo el corazón, te confirmo que asistiré felizmente para celebrar junto a ustedes este hermoso momento.

¡Nos vemos pronto!

Con cariño, ${data.guestname}

*Nota*

${data.notes}

`

            const text2 = `Querido@,

Quiero agradecerte profundamente por la invitación a tu boda. Es un honor que hayas pensado en mí para compartir un día tan importante. Sin embargo, con mucha tristeza debo informarte que no podré asistir. Aunque no estaré presente físicamente, estaré contigo en pensamiento y deseo para ti un día lleno de amor y felicidad.

Con cariño, ${data.guestname}

**Nota**

${data.notes}

`
            const textUrl =  encodeURIComponent(check?text1:text2).replace(/\n/g, "%0A");;
            const link = `https://api.whatsapp.com/send/?phone=${number}&text=${textUrl}&type=phone_number`

            // Abrir una nueva ventana con el enlace de WhatsApp
            window.open(link, '_blank');
            
        });
});