const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const connectDB = require('./Config/dbConnection');
const notFoundMiddleware = require('./Middleware/notFoundHandler');
const app = express();
const dotenv = require("dotenv").config();
const expressasyncerrors = require('express-async-errors');
const errorHandlerMiddleware = require('./Middleware/errorHandler');
const port = process.env.PORT;
const morgan = require('morgan');
// const upload = require('./Middleware/multerforimageupload');
const authenticateUserHandler = require('./Middleware/authenticateUserHandler');

connectDB();

// Middlware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use(upload.any());

console.log("Starting Project")

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use("/api/login", require("./Routes/authRoute"));
app.use("/", require("./Routes/authRoute"));
app.use("/api/register", require("./Routes/authRoute"));
app.use("/api/tuitions", require("./Routes/tuitionRoute")); //tuition route added

// app.use("/api/user", authenticateUserHandler, require("./Routes/userRoute"));
app.use("/api/user", require("./Routes/userRoute"));
app.use("/api/tutor", require("./Routes/userRoute"));

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});