const nodemailer = require("nodemailer");
require("dotenv").config();

const sendSignupEmail = async (username, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Platform!",
      text: `Hi ${username},\n\nThank you for signing up. We're excited to have you on board!\n\nBest Regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

module.exports = { sendSignupEmail };
