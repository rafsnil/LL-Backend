const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log("There was an error");
    // console.log(err);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, and you and I, we both don't know what it is"
    }

    // For missing field errors
    if (err.name === 'ValidationError') {
        defaultError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ')
    }

    // For email, phonenumber existing in the Database already
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.message = `User with this ${Object.keys(err.keyValue)} already exists`
    }

    // res.status(defaultError.statusCodes).json({ message: err });
    res.status(defaultError.statusCode).json({ message: defaultError.message });
}
module.exports = errorHandlerMiddleware;