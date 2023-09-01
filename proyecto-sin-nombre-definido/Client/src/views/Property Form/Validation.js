const validation = (form) => {
    let errors = {};

     if (!form.image) {
    errors.image = "Debes subir al menos una imagen"

    } else if( form.image.length === 3 ) {
        errors.image = "Solo puedes subir 3 imagenes por propiedad"
    };

    if(!form.rooms) {
        errors.rooms = "Debes seleccionar al menos una habitación"
    }

}
export default validation;