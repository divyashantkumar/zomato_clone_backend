import CustomError from "../errors/customError.js"

const globalErrorHandler = (err, req, res, next) => {
    if(err instanceof CustomError) {
        res?.status(err?.errorCode)?.send({ errors: err?.serializeError() })
    }

    res?.status(500)?.send({
        errors: [
            {
                errorCode: 500,
                errorType: "INTERNAL_SERVER_ERROR",
                message: "something unexpectd happened"
            }
        ]
    })
}

export default globalErrorHandler