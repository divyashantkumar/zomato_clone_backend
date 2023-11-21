import CustomError from "./customError.js";

class BadRequestError extends CustomError {
    errorCode = 400;
    errorType = "BAD_REQUEST";
    constructor(message) {
        super(message);
    } 
}

export default BadRequestError;