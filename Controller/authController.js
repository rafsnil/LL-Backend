const users = require("../Models/userModel")
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require("../Errors/index");
// @desc: authenticate user
// @route: POST /login
// @access: public


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Perform validation on the email and password
    if (!email || !password) {
        throw new BadRequestError('Please Provide All Values');
    }

    const user = await users.findOne({ email }).select('+password');

    if (!user) {
        throw new UnauthorizedError("User doesn't exist. Please Register First");
    }
    console.log(user);

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Incorrect Password');
    }

    // Check if the email and password are correct (dummy check in this example)

    // Sign-in successful
    const username = user.username;
    const welcomeMessage = `Welcome, ${username}!`;
    return res.json({ message: welcomeMessage });
}


const registerUser = async (req, res, next) => {

    console.log(req.body)
    const { username, usernumber, email, password } = req.body;
    if (!username || !usernumber || !email || !password) {
        throw new BadRequestError("Please fill up all the boxes");
    }

    const user = await users.create({ username, usernumber, email, password });
    const jwtToken = user.createJWT();
    res.status(201).json({ user: { username: user.username, usernumber: user.usernumber, email: user.email }, jwtToken, message: 'User Registered Successfully' })
    console.log(req.body)
}

const micTeshting123 = (req, res) => {

    res.status(200).json({ message: `Tik mato coltaci bai, 10shon kairan na` });

}

module.exports = { loginUser, micTeshting123, registerUser };


// const registerUser = async (req, res, next) => {
//     try {
//         const user = await users.create(req.body);
//         res.status(201).json({ user, message: 'User Registered Successfully' })
//         console.log(req.body)

//     } catch (error) {
//         next(error);
//     }
// }