const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendBookingCancellation = async ({
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
      subject: "❌ Booking Cancelled - ExpertBook",

      html: `
        <div style="font-family:Arial;padding:30px">

          <h1 style="color:#DC2626">
            Booking Cancelled
          </h1>

          <p>Hello <b>${name}</b>,</p>

          <p>Your booking has been cancelled successfully.</p>

          <hr>

          <p><b>Expert:</b> ${expertName}</p>

          <p><b>Date:</b> ${date}</p>

          <p><b>Time:</b> ${timeSlot}</p>

          <hr>

          <p>
            This slot is now available again.
          </p>

          <p>
            Thank you for using ExpertBook.
          </p>

        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      return;
    }

    console.log("✅ Cancellation email sent");
    console.log("Email ID:", data.id);
  } catch (err) {
    console.error("❌ Failed to send cancellation email:", err);
  }
};

module.exports = sendBookingCancellation;
