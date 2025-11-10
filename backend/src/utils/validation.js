const validator = require("validator")


const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    else if (firstName.length < 1 || firstName.length > 15) {
        throw new Error("FirstName should 1-15");
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
}

const validateLoginData = (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Enter required fields");
    }

    if (!validator.isEmail) {
        throw new Error("Email is not valid");
    }
}

const validateProfileEdit = (req) => {
    const data = req.body;

    const ALLOWED_UPDATES = ["photoUrl", "age", "about", "gender", "skills", "password"];

    // Only pick allowed fields
    const isAllowedUpdates = Object.keys(data).every((key) =>   // boolean
        ALLOWED_UPDATES.includes(key)
    );

    if (!isAllowedUpdates) {
        throw new Error("invalid edit request");
    }

    if (data.skills !== undefined) {
        if (data?.skills.length > 10) {
            throw new Error("Skills not allowed more than 10")
        }
    }

    if (data?.age < 18) {
        throw new Error("age not allowed below 18")
    }

    if (data?.age > 100) {
        throw new Error("age not allowed above 100")
    }

    if (data.about !== undefined) {
        if (data?.about.length > 250) {
            throw new Error("about not allowed more than 25")
        }
    }
}

const validateChangePassword = (req) => {
    const { password } = req.body;

    const ALLOWED_UPDATE = ["password"];

    const isValidChange = Object.keys(req.body).every(k => ALLOWED_UPDATE.includes(k));

    if(!isValidChange){
        throw new Error("Invalid update request");
    }

    if(!password){
        throw new Error("Enter required field");
    }

    if(password > 50){
        throw new Error("Password must not exceed 50 characters");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
}

const validateConnectionRequest = (req) => {
    const ALLOWED_REQUEST = ["interested","ignored"];
    const isValidRequest = ALLOWED_REQUEST.includes(req.params.status);

    if(!isValidRequest){
        throw new Error("Invalid request status");
    }
}

const validateConnectionReviewRequest = (req) =>{
    const ALLOWED_REQUEST = ["accepted","rejected"];
    const isValidRequest = ALLOWED_REQUEST.includes(req.params.status);

    if(!isValidRequest){
        throw new Error("Invalid request status");
    }
}


module.exports = {
    validateSignupData,
    validateLoginData,
    validateProfileEdit,
    validateChangePassword,
    validateConnectionRequest,
    validateConnectionReviewRequest
}
