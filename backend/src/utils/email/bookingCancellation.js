const transporter = require("./transporter");

const sendBookingCancellation = async ({
  name,
  email,
  expertName,
  date,
  timeSlot,
}) => {
  await transporter.sendMail({
    from: `"ExpertBook" <${process.env.EMAIL_USER}>`,
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

  console.log(`❌ Cancellation email sent to ${email}`);
};

module.exports = sendBookingCancellation;
