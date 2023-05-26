const users = require("../Models/userModel")

// @desc: authenticate user
// @route: POST /login
// @access: public

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Perform validation on the email and password
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if the email and password are correct (dummy check in this example)
    if (email !== 'niloy@lovetitties.com' || password !== 'password') {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Sign-in successful
    const welcomeMessage = `Welcome, ${email}!`;
    return res.json({ message: welcomeMessage });
}


const registerUser = async (req, res, next) => {

    const user = await users.create(req.body);
    const jwtToken = user.createJWT();
    res.status(201).json({ user: { userName: user.userName, email: user.email }, jwtToken, message: 'User Registered Successfully' })
    // console.log(req.body)
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