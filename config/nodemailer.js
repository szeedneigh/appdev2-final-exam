const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email function
exports.sendEmail = async (options) => {
  try {
    // Compile pug template
    const templatePath = path.join(__dirname, '..', 'emails', options.template);
    const html = pug.renderFile(templatePath, options.data);

    // Define email options
    const mailOptions = {
      from: `Event Management <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.email}`);
  } catch (error) {
    console.error('Email error:', error);
  }
}; 