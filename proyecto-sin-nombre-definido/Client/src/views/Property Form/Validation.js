const validation = (form) => {
    console.log(form);
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

   

    if (!form.location) errors.location = "Ingrese un locacion ";
    else if (form.location.length < 6)
        errors.location = "El locacion  es muy corto";
    else if (form.location.length > 25)
        errors.location = "El locacion  es muy largo";

    

     if (form.images.length === 0) {
    errors.images = "Debes subir al menos una imagen"
    } 
    
    if(!form.rooms) {
        errors.rooms = "Debes seleccionar al menos una habitación"
    } else if (form.rooms.length > 3) {
        errors.rooms = "No puedes poner mas de 3 cifras en habitaciones"
    } else if(form.rooms < 0) {
        errors.rooms = "No puede ser un numero negativo"
    }
    
    if(!form.bathrooms) {
        errors.bathrooms = "Debes seleccionar al menos una habitación"
    } else if (form.bathrooms.length > 2) {
        errors.rooms = "No puedes poner mas de 2 cifras en baños"
    } else if(form.bathrooms < 0) {
        errors.bathrooms = "No puede ser un numero negativo"
    }

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


    if (!form.location) errors.location = "Ingrese un locacion ";

    else if (form.location.length < 6)
        errors.location = "El locacion  es muy corto";

    else if (form.location.length > 25)
        errors.location = "El locacion  es muy largo";

    if(!form.coveredArea) {
        errors.coveredArea = "Ingrese una superficie cubierta";
    } else if(form.coveredArea.length >3) errors.coveredArea = "La superficie cubierta es muy grande";

    if(!form.totalArea) {
        errors.totalArea = "Ingrese una superficie total";
    } else if(form.totalArea.length > 4) errors.totalArea = "La superficie total es muy grande";

    if(!form.rentPrice ) {
        errors.rentPrice = "Ingrese un precio de alquiler";
    }
   
    if(!form.description) {
        errors.description = "Ingrese una descripcion";
    } 
    return errors;
}
export default validation;