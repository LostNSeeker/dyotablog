exports.validateSignup = (data) => {
    const { username, email, password } = data;
    let errors = [];

    if (!username || !email || !password) {
        errors.push({ msg: "Please enter all fields" });
    }

    return errors;
};
