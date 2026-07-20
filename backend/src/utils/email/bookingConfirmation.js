const transporter = require("./transporter");

const sendBookingConfirmation = async ({
  name,
  email,
  expertName,
  date,
  timeSlot,
}) => {
  await transporter.sendMail({
    from: `"ExpertBook" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Booking Confirmed - ExpertBook",
    html: `
      <!-- Your current confirmation HTML -->
    `,
  });

  console.log(`✅ Confirmation email sent to ${email}`);
};

module.exports = sendBookingConfirmation;
