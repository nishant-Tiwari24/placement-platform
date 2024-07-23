import nodemailer from "nodemailer";

const sendInvitationEmail = async (recipientEmail, sender, data) => {
    // if (!nodemailer.utils.isEmail(recipientEmail)) {
    //     throw new Error("Invalid email address format");
    // }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: sender.email,
            pass: sender.passCode,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: sender.email,
            to: recipientEmail,
            subject: "Registration",
            text: data,
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
    }
};

export { sendInvitationEmail };
