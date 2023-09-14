const validation = (form, step) => {
  //   console.log(form);
  let errors = {};

if(step == 1) {

  if (!form.name) errors.name = "Ingrese un nombre ";
  else if (form.name && form.name.length < 6)
  errors.name = "El nombre  es muy corto";
   else if (form.name && form.name.length > 25)
     errors.name = "El nombre  es muy largo";

   if (!form.address) errors.address = "Ingrese una direccion";
   else if (form.address && form.address.length < 3)
     errors.address = "La dirección es muy corta";
   else if (form.address && form.address.length > 75)
     errors.address = "La dirección es muy larga";
   else if (
     form.address &&
     !/^[\w\sñÑáéíóúÁÉÍÓÚ]*\d+[\w\sñÑáéíóúÁÉÍÓÚ]*$/.test(form.address)
   ) {
     errors.address = "Tiene que tener el número de calle";
   }

   if (!form.country) errors.country = "Ingrese un pais ";
   else if (form.country && form.country === "Seleccione un pais") errors.country = "Ingrese un país"

   if (!form.location )
     errors.location = "Ingrese un locacion ";
    else if (form.location && form.location == "Seleccione una ciudad")
     errors.location = "Ingrese una ciudad";
    
    if (form.images && form.images.length < 1) {
      errors.images = "Debes subir  al menos una imagen";
    } else if (form.images && form.images.length > 3) {
      errors.images = "No puedes subir mas de 3 imágenes";
    }
  };
if(step == 2) {

  if (!form.rooms) {
    errors.rooms = "Debes seleccionar al menos una habitación";
  } else if (form.rooms && form.rooms.length > 3) {
     errors.rooms = "No puedes poner mas de 3 cifras en habitaciones";
   } else if (form.rooms && form.rooms < 0) {
     errors.rooms = "No puede ser un numero negativo";
   }

   if (!form.bathrooms) {
     errors.bathrooms = "Debes seleccionar al menos una habitación";
   } else if (form.bathrooms && form.bathrooms.length > 2) {
     errors.rooms = "No puedes poner mas de 2 cifras en baños";
   } else if (form.bathrooms && form.bathrooms < 0) {
     errors.bathrooms = "No puede ser un número negativo";
   }

   if (!form.coveredArea) {
     errors.coveredArea = "Ingrese una superficie cubierta";
   } else if (form.coveredArea && form.coveredArea.length > 4)
     errors.coveredArea = "La superficie cubierta es muy grande";

   if (!form.totalArea) {
     errors.totalArea = "Ingrese una superficie total";
    } else if (form.totalArea && form.totalArea.length > 4)
    errors.totalArea = "La superficie total es muy grande";
    
   if (!form.rentPrice) {
     errors.rentPrice = "Ingrese un precio de alquiler";
   }
   if ( !form.description) {
     errors.description = "Ingrese una descripción";
   } else if (form.description && form.description.length < 10) {
     errors.description = "La descripción es muy corta";
   }

  }; 
  if(step === 3) {

    if (form.amenities && form.amenities.length === 0) {
      errors.amenities = "Tines que escoger alguna amenidad";
    } else if (form.amenities && form.amenities.length < 5) {
      errors.amenities = "Debes ingresar al menos 5 amenidades";
    } else if (form.amenities && form.amenities.length > 30) {
      errors.amenities = "No puedes agregar más de 30 amenidades";
    }
  };
  return errors;
};
export default validation;
