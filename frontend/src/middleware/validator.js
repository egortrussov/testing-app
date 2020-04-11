const validate = (data) => {
    let errors = [];
    data.forEach(field => {
        if (field.name === 'email') {
            if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field.value)) ) {
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