
class CustomError extends Error {
    errorCode = 500; //number
    errorType = 'INTERNAL_SERVER_ERROR'; //string
    constructor(message) {
        super(message);
    };

    serializeError() {
        return [{errorCode: this.errorCode, errorType: this.errorType, message: this.message}];
    }
}

export default CustomError;