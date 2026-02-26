import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
    const { firstName, lastName, email, topic, message } = req.body;

    if (!firstName || !lastName || !email || !topic || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // We will attempt to use a standard nodemailer transport.
        // The user needs to supply SMTP_USER and SMTP_PASS in their .env
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE || "gmail", // default to gmail
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, // App password if using Gmail
            },
        });

        const mailOptions = {
            from: `"${firstName} ${lastName}" <${email}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Send to admin email
            subject: `[Support Request: ${topic.toUpperCase()}] from ${firstName} ${lastName}`,
            html: `
        <h3>New Support Message</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Category:</strong> ${topic}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Nodemailer error:", error);
        res.status(500).json({ message: "Failed to send message: Check your SMTP credentials in .env", error: error.message });
    }
};
