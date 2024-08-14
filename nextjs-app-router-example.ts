// app/api/send-email/route.ts

import nodemailer from "nodemailer";

export async function POST(req: Request): Promise<Response> {
  const { to, subject, text }: { to: string; subject: string; text: string } =
    await req.json(); // Parse the JSON body

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
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export const config = {
  runtime: "edge", // Optional: Specify the runtime to edge for faster performance (use this only if compatible)
};
