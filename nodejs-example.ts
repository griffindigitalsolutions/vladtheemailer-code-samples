// using nodemail package. Install with npm: npm install nodemailer

const nodemailer = require("nodemailer");

// Create a transporter
let transporter = nodemailer.createTransport({
    host: "smtp-relay.vladtheemailer.com",
    port: 587,
    secure: true,
    auth: {
        user: "your.sender@yourdomain.com", // Your sender address
        pass: "your-vlad-the-emailer-api-key" // Your API key
    }
});

// Email details
let mailOptions = {
    from: "your.sender@yourdomain.com", // Sender address
    to: "receiver@example.com", // List of receivers
    subject: "Testing my email", // Subject line
    text: "Body of my email" // Plain text body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log("Error:", error);
    }
    console.log("Email sent: " + info.response);
});
