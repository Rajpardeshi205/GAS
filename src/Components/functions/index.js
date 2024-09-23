const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key); // Store your SendGrid API key in Firebase Functions config

exports.sendBookingEmail = functions.https.onRequest(async (req, res) => {
  const { name, address, mobile, email } = req.body;

  const msg = {
    to: email, // User's email
    from: 'hhmm223100joyboyfrom800yearago@gmail.com', // Your verified sender email
    subject: 'Gas Booking Confirmation',
    text: `Hi ${name},\n\nYour booking request has been received.\n\nDetails:\nName: ${name}\nAddress: ${address}\nMobile: ${mobile}\n\nThank you for your booking!`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).send('Error sending email');
  }
});
