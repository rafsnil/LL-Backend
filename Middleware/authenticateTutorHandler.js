const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require("../Errors/index");

const auth = async (req, res, next) => {
    const headers = req.headers;
    const authHeader = req.headers.authorization;
    console.log(headers)
    console.log(authHeader)
    console.log("Performing Authentication")



    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith('Bearer')) {
    //     throw new UnauthorizedError("Authentication Invalid")
    // }

    // const token = authHeader.split(' ')[1];

    // try {

    //     const payload = jwt.verify(token, process.env.JWT_SECRET)
    //     // console.log(payload);
    //     req.user = { userID: payload.userID };
    //     console.log(req.user)
    //     next()

    // } catch (error) {
    //     throw new UnauthorizedError("Authentication Invalid")
    // }


}

module.exports = auth;

