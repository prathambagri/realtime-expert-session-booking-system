const dns = require("dns");

const nodemailer = require("nodemailer");

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingConfirmation = async ({
  name,
  email,
  expertName,
  date,
  timeSlot,
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"ExpertBook" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Booking Confirmed - ExpertBook",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">
          <div style="background:#5B21B6;padding:25px;text-align:center;">
            <h1 style="color:white;margin:0;">🎯 ExpertBook</h1>
          </div>

          <div style="padding:30px;">
            <h2>Booking Confirmed! 🎉</h2>

            <p>Hello <b>${name}</b>,</p>

            <p>Your expert session has been booked successfully.</p>

            <div style="background:#F5F3FF;padding:20px;border-left:5px solid #5B21B6;border-radius:8px;">
              <p><b>Expert:</b> ${expertName}</p>
              <p><b>Date:</b> ${date}</p>
              <p><b>Time:</b> ${timeSlot}</p>
            </div>

            <p style="margin-top:20px;">
              Please join your session 5 minutes before the scheduled time.
            </p>

            <hr>

            <p style="font-size:12px;color:#777;">
              This is an automated email from ExpertBook.
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ Gmail Email Sent");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Gmail Email Error");
    console.error(error);
  }
};

module.exports = { sendBookingConfirmation };
