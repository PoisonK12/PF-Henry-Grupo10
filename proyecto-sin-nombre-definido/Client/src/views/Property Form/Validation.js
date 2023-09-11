const validation = (form) => {
  //   console.log(form);
  let errors = {};

   if (!form.name) errors.name = "Ingrese un nombre ";
   else if (form.name && form.name.length < 6)
     errors.name = "El nombre  es muy corto";
   else if (form.name && form.name.length > 25)
     errors.name = "El nombre  es muy largo";

   if (!form.address) errors.address = "Ingrese una direccion";
   else if (form.address && form.address.length < 3)
     errors.address = "La direccion es muy corta";
   else if (form.address && form.address.length > 25)
     errors.address = "La direccion es muy larga";
   else if (
     form.address &&
     !/^[\w\sñÑáéíóúÁÉÍÓÚ]*\d+[\w\sñÑáéíóúÁÉÍÓÚ]*$/.test(form.address)
   ) {
     errors.address = "Tiene que tener el número de calle";
   }

   if (form.country && !form.country) errors.country = "Ingrese un pais ";

   if (form.location && form.location == "")
     errors.location = "Ingrese un locacion ";
   else if (form.location && form.location == "Seleccione una ciudad")
     errors.location = "Ingrese una ciudad";

   if (form.images && form.images.length < 1) {
     errors.images = "Debes subir  al menos 1 imagenes";
   } else if (form.images && form.images.length > 3) {
     errors.images = "No puedes subir mas de 3 imagenes";
   }

   if (form.rooms && !form.rooms) {
     errors.rooms = "Debes seleccionar al menos una habitación";
   } else if (form.rooms && form.rooms.length > 3) {
     errors.rooms = "No puedes poner mas de 3 cifras en habitaciones";
   } else if (form.rooms && form.rooms < 0) {
     errors.rooms = "No puede ser un numero negativo";
   }

   if (form.bathrooms && !form.bathrooms) {
     errors.bathrooms = "Debes seleccionar al menos una habitación";
   } else if (form.bathrooms && form.bathrooms.length > 2) {
     errors.rooms = "No puedes poner mas de 2 cifras en baños";
   } else if (form.bathrooms && form.bathrooms < 0) {
     errors.bathrooms = "No puede ser un numero negativo";
   }

   if (form.coveredArea && !form.coveredArea) {
     errors.coveredArea = "Ingrese una superficie cubierta";
   } else if (form.coveredArea && form.coveredArea.length > 4)
     errors.coveredArea = "La superficie cubierta es muy grande";

   if (form.totalArea && !form.totalArea) {
     errors.totalArea = "Ingrese una superficie total";
   } else if (form.totalArea && form.totalArea.length > 4)
     errors.totalArea = "La superficie total es muy grande";

   if (form.rentPrice && !form.rentPrice) {
     errors.rentPrice = "Ingrese un precio de alquiler";
   }

   if (form.description && !form.description) {
     errors.description = "Ingrese una descripcion";
   } else if (form.description && form.description.length < 10) {
     errors.description = "Es muy corta";
   }

   if (form.amenities.length === 0) {
     errors.amenities = "Tines que escoger alguna amenities";
   } else if (form.amenities && form.amenities.length < 5) {
     errors.amenities = "Tienes que tener un minimo de 5 ";
   } else if (form.amenities && form.amenities.length > 30) {
     errors.amenities = "No pueden ser mayor a 30 amenities";
   }
  return errors;
};
export default validation;
