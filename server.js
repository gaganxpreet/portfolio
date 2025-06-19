const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create messages directory if it doesn't exist
const messagesDir = path.join(__dirname, 'messages');
if (!fs.existsSync(messagesDir)) {
  fs.mkdirSync(messagesDir, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the current directory
app.use(express.static('.'));

// Verify email configuration
const verifyEmailConfig = () => {
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || EMAIL_USER === 'your-email@gmail.com' || 
      !EMAIL_PASS || EMAIL_PASS === 'your-app-password') {
    console.warn('⚠️ WARNING: Email configuration is not set up properly in .env file');
    console.warn('⚠️ The contact form will save messages locally but emails will not be sent');
    return false;
  }
  return true;
};

// Configure nodemailer transporter
let transporter = null;
if (verifyEmailConfig()) {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Verify transporter
    transporter.verify(function(error, success) {
      if (error) {
        console.error('❌ Email transporter error:', error);
      } else {
        console.log('✅ Email server is ready to send messages');
      }
    });
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error);
  }
}

// Save message to file
const saveMessageToFile = (messageData) => {
  const messagesFilePath = path.join(messagesDir, 'messages.csv');
  const header = 'timestamp,name,email,subject,message\n';
  const row = `"${messageData.timestamp}","${messageData.name}","${messageData.email}","${messageData.subject}","${messageData.message.replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;

  try {
    if (!fs.existsSync(messagesFilePath)) {
      fs.writeFileSync(messagesFilePath, header);
    }
    fs.appendFileSync(messagesFilePath, row);
    console.log(`✅ Message saved to ${messagesFilePath}`);
    return true;
  } catch (error) {
    console.error('❌ Error saving message to file:', error);
    return false;
  }
};

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validate form data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }
  
  // Create message data object
  const messageData = {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString()
  };
  
  // Always save message to file as backup
  saveMessageToFile(messageData);
  
  // If email is not configured, return success but note that it was only saved locally
  if (!transporter) {
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been saved. However, email delivery is not configured.'
    });
  }
  
  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER, // Where to send the contact form submissions
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${mailOptions.to}`);
    
    // Send success response
    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email, but your message has been saved. We will get back to you soon.'
    });
  }
});

// API endpoint to check server status
app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    status: 'online',
    emailConfigured: !!transporter
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Messages will be saved to ${messagesDir}`);
  console.log(`🌐 API endpoints available at:`);
  console.log(`   - POST /api/contact - Submit contact form`);
  console.log(`   - GET /api/status - Check server status`);
});