export const validation = (form) => {
    
    let errors = {};
    let emailRegex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const year = parseInt(form.birthDate?.substring(0, 4));



    if(!form.profilePic) {
        errors.profilePic = "Tines que agregar una foto"
         }

    if(!form.email) {
        errors.email = "Tienes que agregar un email"
    }else if((form.email && !emailRegex.test(form.email))) {
        errors.email = "No es un email válido"
    } else if(form.email && form.email.length === 60) {
        errors.email = "Es muy largo"
    } else if(form.email && form.email.length < 5) {
        errors.email = "Es muy corto"
    };

    if(!form.password) {
        errors.password = "Tines que escribir una contraseña"
    } else if(form.password && !/[0-9]+/.test(form.password)) {
        errors.password = "Tiene que tener un al menos un número"
    } else if( form.password &&  !/[A-Z]/.test(form.password)) {
        errors.password = "Tiene que tener al menos una mayúscula"
    } else if( form.password && !/^(?=(?:.*\d){1})(?=(?:.*[@$?¡\-_]){1})/.test(form.password)) {
        errors.password = "Tiene que tener al menos un carácter especial"
    }
    
    if(!form.confirmPassword) {
        errors.confirmPassword = "Tines que confirmar la contraseña"    
    } else if((form.confirmPassword && form.password) && form.password !== form.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden"
    }

    if(!form.userName) {
        errors.userName = "Tienes que tener un nombre de usuario"
    } else if(form.userName && form.userName.length > 15) {
        errors.userName = "Elusuario será muy largo"
    } else if (form.userName && form.userName.length < 3) {
        errors.userName = "Es demaciado corto"
    }

    if(!form.fullName) {
        errors.fullName = "Escribe tu nombre completo"
    } else if(form.fullName && !/[A-Z]/.test(form.fullName)) {
        errors.fullName = " Las iniciales tienen que estar con mayusculas"
    } else if(form.fullName && form.fullName.length > 20) {
        errors.fullName = " Es  demaciado largo "
    }

    if(!form.phoneNumber) {
        errors.phoneNumber = "Escribe tu número e teléfono"
    } else if(form.phoneNumber && !/^[0-9()+\- ]*$/.test(form.phoneNumber)) {
        errors.phoneNumber = "Tiene que tener el prefijo nacional.EJ:(+54)"
    } else if( form.phoneNumber &&  form.phoneNumber.length > 15) {
        errors.phoneNumber = "El número de telefono grande"
    }

    if(!form.birthDate) {
        errors.birthDate = "Pon tu fecha de nacimiento"
    } else if(form.birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)) {
        errors.birthDate = "El formato de fecha no es válido"
    } else if (year > 2023) {
        errors.birthDate = "Ese año no existe aún!"
    } 


    if(!form.nationality) {
        errors.nationality = "Tienes que elegir una nacionalidad"
    }


    if(!form.address) {
        errors.address = "Tienes que escribir tu dirección"
    } else if(form.address && !/^[A-Za-z\s]+\d+$/.test(form.address)) {
        errors.address = "Tiene que tener el número de calle"
    }

    if(!form.gender) {
        errors.gender = "Tienes que seleccionar un género"
    } else if (form.gender && form.gender === "") {
        errors.gender = "Tienes que seleccionar un género"
    }

    if(!form.landlord) {
        errors.landlord = "Tienes que seleccionar un género"
    } else if (form.landlord && form.landlord === "") {
        errors.landlord = "Tienes que seleccionar un género"
    }
        return errors
}