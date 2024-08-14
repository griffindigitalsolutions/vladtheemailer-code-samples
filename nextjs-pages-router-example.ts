// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { to, subject, text }: { to: string; subject: string; text: string } =
      req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.vladtheemailer.com",
      port: 587,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "your.sender@yourdomain.com", // Your sender address
        pass: "your-vlad-the-emailer-api-key", // Your API key
      },
    });

    // Email details
    let mailOptions = {
      from: "your.sender@yourdomain.com", // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      text: text, // Plain text body
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Failed to send email", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
