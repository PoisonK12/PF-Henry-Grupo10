const validation = (form) => {
    let errors = {};
    
    if (!form.name) errors.name = "Ingrese un nombre ";
    else if (form.name.length < 6)
        errors.name = "El nombre  es muy corto";
    else if (form.name.length > 25)
        errors.name = "El nombre  es muy largo";

    if (!form.address) errors.address = "Ingrese una direccion";
    else if (form.address.length < 6)
        errors.address = "El direccion es muy corto";
    else if (form.address.length > 25)
        errors.address = "El direccion es muy largo";

    if (!form.country) errors.country = "Ingrese un pais ";
    else if (form.country.length < 6)
        errors.country = "El pais  es muy corto";
    else if (form.country.length > 25)
        errors.country = "El pais  es muy largo";

    if (!form.state) errors.state = "Ingrese un provincia ";
    else if (form.state.length < 6)
        errors.state = "El provincia  es muy corto";
    else if (form.state.length > 25)
        errors.state = "El provincia  es muy largo";

    if (!form.location) errors.location = "Ingrese un locacion ";
    else if (form.location.length < 6)
        errors.location = "El locacion  es muy corto";
    else if (form.location.length > 25)
        errors.location = "El locacion  es muy largo";

    

     if (!form.image) {
    errors.image = "Debes subir al menos una imagen"

    } else if( form.image.length > 3 ) {
        errors.image = "Solo puedes subir 3 imagenes por propiedad"
    };

    if(!form.rooms) {
        errors.rooms = "Debes seleccionar al menos una habitación"
    }
    return errors
}
export default validation;