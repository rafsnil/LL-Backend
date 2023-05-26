

// // Route for sign-in
// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;

//     // Perform validation on the email and password
//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required.' });
//     }

//     // Check if the email and password are correct (dummy check in this example)
//     if (email !== 'niloy@lovetitties.com' || password !== 'password') {
//         return res.status(401).json({ error: 'Invalid credentials.' });
//     }

//     // Sign-in successful
//     const welcomeMessage = `Welcome, ${email}!`;
//     return res.json({ message: welcomeMessage });
// });

