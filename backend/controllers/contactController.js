const nodemailer = require("nodemailer");
const twilio = require("twilio");
const Contact = require("../model/Contact");

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// WhatsApp setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 🔹 User contact form submission (Public Route)
exports.contactMe = async (req, res) => {
  try {
    const { name, email, contact, message } = req.body;
    if (!name || !email || !contact || !message)
      return res.status(400).json({ message: "All fields are required" });

    // Save message in DB (you can set adminId manually if you have single admin)
    const newMessage = await Contact.create({
      name,
      email,
      contact,
      message,
      adminId: process.env.DEFAULT_ADMIN_ID, // or find your admin automatically
    });

    // 💌 Email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Contact:</b> ${contact}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    // 💬 WhatsApp
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.ADMIN_WHATSAPP_TO,
      body: `📩 New Portfolio Message
Name: ${name}
Email: ${email}
Contact: ${contact}
Message: ${message}`,
    });

    res.status(200).json({ message: "Message sent and saved successfully!", data: newMessage });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// 🔹 Admin route - Fetch all messages
exports.getAllMessages = async (req, res) => {
  try {
    // Single-admin fix
    const adminId = process.env.DEFAULT_ADMIN_ID || req.admin?._id;

    const messages = await Contact.find({ adminId }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// 🔹 Admin route - Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
