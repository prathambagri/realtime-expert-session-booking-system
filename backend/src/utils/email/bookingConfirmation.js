const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendBookingConfirmation = async ({
  name,
  email,
  expertName,
  date,
  timeSlot,
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "ExpertBook <onboarding@resend.dev>",
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

    if (error) {
      console.error("❌ Resend Error:", error);
      return;
    }

    console.log("✅ Booking confirmation email sent");
    console.log("Email ID:", data.id);
  } catch (err) {
    console.error("❌ Failed to send booking confirmation:", err);
  }
};

module.exports = sendBookingConfirmation;
