const users = require("../Models/userModel")
const tutors = require("../Models/tutorModel")
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require("../Errors/index");
const upload = require('../Middleware/multerforimageupload');
const fs = require('fs');
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
    // console.log(user);

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Incorrect Password');
    }

    const token = user.createJWT();
    user.password = undefined; //To hide the password from being sent to the frontend
    res.status(StatusCodes.OK).json({
        user,
        token,
    });

    // Sign-in successful
    // const username = user.username;
    // const welcomeMessage = `Welcome, ${username}!`;
    // return res.json({ message: welcomeMessage });
}


const registerUser = async (req, res, next) => {

    console.log(req.body)
    const { username, usernumber, email, password } = req.body;
    if (!username || !usernumber || !email || !password) {
        throw new BadRequestError("Please fill up all the boxes");
    }

    const user = await users.create({ username, usernumber, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            username: user.username,
            usernumber: user.usernumber,
            email: user.email
        },
        token,
        message: 'User Registered Successfully'
    })
    console.log(req.body)
}



const registerTutor = async (req, res, next) => {
    console.log("Tutor reg form incoming");
    // console.log(req.body);
    // console.log(req.files);
    const { name, phonenumber, email, password } = req.body;

    if (!name || !phonenumber || !email || !password) {
        throw new BadRequestError("Please fill up all the boxes");
    }

    const picture = req.files.find(file => file.fieldname === 'picture').filename;


    // console.log(picture);
    // Handle certificates upload
    const certificates = req.files
        .filter(file => file.fieldname.startsWith('certificates'))
        .map(file => file.filename);

    // console.log(certificates)
    try {
        // Create a new tutor document
        const newTutor = new tutors({
            name,
            phonenumber,
            email,
            password,
            picture,
            certificates,
        });

        // Save the tutor document to the database
        await newTutor.save();

        // Return a success response
        res.status(StatusCodes.CREATED).json({ message: "Tutor created successfully" });
    } catch (error) {
        // Handle any errors that occur during saving the tutor document
        if (picture) {
            deleteFile(picture); // Delete picture file
        }

        if (certificates && certificates.length > 0) {
            certificates.forEach(filename => deleteFile(filename)); // Delete certificates files
        }
        throw new BadRequestError("Failed to create tutor");
    }
};
const deleteFile = (filename) => {
    fs.unlink(`uploads/${filename}`, (error) => {
        if (error) {
            console.log(`Failed to delete file: ${filename}`, error);
        } else {
            console.log(`Deleted file: ${filename}`);
        }
    });
};




const micTeshting123 = (req, res) => {

    res.status(200).json({ message: `Tik mato coltaci bai, 10shon kairan na` });

}

module.exports = { loginUser, micTeshting123, registerUser, registerTutor };


// const registerUser = async (req, res, next) => {
//     try {
//         const user = await users.create(req.body);
//         res.status(201).json({ user, message: 'User Registered Successfully' })
//         console.log(req.body)

//     } catch (error) {
//         next(error);
//     }
// }



// Upload multiple certificate files
        // upload.array('certificates', 8)(req, res, async (err) => {
        //     if (err) {
        //         throw new BadRequestError("Error uploading certificates");
        //     }

        //     // Access the uploaded certificate files using req.files
        //     const certificates = req.files;
        //     console.log(certificates);

        //     try {
        //         const tutor = await tutors.create({
        //             name,
        //             phonenumber,
        //             email,
        //             password,
        //             picture: picture.filename, // Store the picture filename in the database
        //             certificates: certificates.map(file => file.filename) // Store an array of certificate filenames in the database
        //         });

        //         res.status(StatusCodes.CREATED).json({
        //             user: {
        //                 name: tutor.name,
        //                 phonenumber: tutor.phonenumber,
        //                 email: tutor.email,
        //             },
        //             message: "User Registered Successfully",
        //         });
        //     } catch (error) {
        //         // Handle database or other errors
        //         next(error);
        //     }
        // });