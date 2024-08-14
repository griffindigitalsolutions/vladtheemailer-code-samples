<?php
// with PHPMailer. Install via composer require phpmailer/phpmailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "vendor/autoload.php";

// Email details
$mail = new PHPMailer(true);
try {
  // SMTP settings
  $mail->isSMTP();
  $mail->Host = "smtp-relay.vladtheemailer.com";
  $mail->SMTPAuth = true;
  $mail->Username = "your.sender@yourdomain.com";  // Your email sender
  $mail->Password = "your-vlad-the-emailer-api-key";  // Your API key
  $mail->SMTPSecure = "tls";
  $mail->Port = 587;

  // Recipients
  $mail->setFrom("your.sender@yourdomain.com", "Sender Name");
  $mail->addAddress("receiver_email@example.com", "Receiver Name");

  // Content
  $mail->isHTML(true);
  $mail->Subject = "Testing my email";
  $mail->Body    = "Body of my email";
  $mail->AltBody = "Body of my email in plain text";

  $mail->send();
  echo "Email sent successfully.";
} catch (Exception $e) {
  echo "Failed to send email. Mailer Error: {$mail->ErrorInfo}";
}
