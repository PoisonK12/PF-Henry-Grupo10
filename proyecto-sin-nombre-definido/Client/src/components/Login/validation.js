export const validation = (form) => {
    let errors = {}; 

    if(form.email && !form.email) {
        errors.email = "Tienes que escribir un email válido"
    }

    if(form.password && !form.password) {
        errors.password = "Tienes que escribir una contraseña"
    }
    return errors;
};