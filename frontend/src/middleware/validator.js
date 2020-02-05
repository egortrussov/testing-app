const validate = (data) => {
    let errors = [];
    data.forEach(field => {
        if (field.name === 'email') {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value)) ) {
                errors['email'] = 'Invalid email'
            } 
        } 
        if (field.name === 'password') {
            if (field.value.length < 6) {
                errors['password'] = 'Password must be at least 6 characters'
            }
        }
        if (field.name === 'fullName') {
            if (field.value.trim().length <= 5) {
                errors['fullName'] = 'Please enter a real full name'
            }
        }
    })

    return errors;
}

export {
    validate
}