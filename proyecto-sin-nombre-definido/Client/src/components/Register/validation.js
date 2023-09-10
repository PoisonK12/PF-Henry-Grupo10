export const validation = (form) => {
    
    let errors = {};
    let emailRegex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const year = parseInt(form.birthDate?.substring(0, 4));



    if(!form.profilePic) {
        errors.profilePic = "Ingresa una foto"
         }

    if(!form.email) {
        errors.email = "Ingresa un email"
    }else if((form.email && !emailRegex.test(form.email))) {
        errors.email = "No es un email válido"
    } else if(form.email && form.email.length === 60) {
        errors.email = "Es muy largo"
    } else if(form.email && form.email.length < 5) {
        errors.email = "Es muy corto"
    };

    if(!form.password) {
        errors.password = "Ingresa una contraseña"
    } else if(form.password && !/[0-9]+/.test(form.password)) {
        errors.password = "Al menos un número"
    } else if( form.password &&  !/[A-Z]/.test(form.password)) {
        errors.password = "Al menos una mayúscula"
    }
    
    if(!form.confirmPassword) {
        errors.confirmPassword = "Confirma la contraseña"    
    } else if((form.confirmPassword && form.password) && form.password !== form.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden"
    }

    if(!form.userName) {
        errors.userName = "Ingresa un nombre de usuario"
    } else if(form.userName && form.userName.length > 15) {
        errors.userName = "El nombre es muy largo"
    } else if (form.userName && form.userName.length < 3) {
        errors.userName = "El nombre es muy corto"
    }

    if(!form.fullName) {
        errors.fullName = "Ingresa tu nombre completo"
    } else if(form.fullName && !/[A-Z]/.test(form.fullName)) {
        errors.fullName = " Inicial con mayuscula"
    } 

    if(!form.phoneNumber) {
        errors.phoneNumber = "Ingresa tu número de teléfono"
    } else if(form.phoneNumber && !/^[0-9()+\- ]*$/.test(form.phoneNumber)) {
        errors.phoneNumber = "Necesario el prefijo nacional.EJ:(+54)"
    } else if( form.phoneNumber &&  form.phoneNumber.length > 15) {
        errors.phoneNumber = "El número de telefono grande"
    }

    if(!form.birthDate) {
        errors.birthDate = "Ingresa tu fecha de nacimiento"
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
        errors.gender = "Necesario un género"
    } else if (form.gender && form.gender === "") {
        errors.gender = "Necesario un género"
    }

    if(!form.landlord) {
        errors.landlord = "Necesario un rol"
    } else if (form.landlord && form.landlord === "") {
        errors.landlord = "Necesario un rol"
    }
        return errors
}