import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email details
sender_email = "your.sender@yourdomain.com"
receiver_email = "receiver@example.com"
api_key = "your-vlad-the-emailer-api-key"
subject = "Testing my email"
body = "Body of my email"

# Create the email
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject
message.attach(MIMEText(body, "plain"))

# Sending the email
try:
    server = smtplib.SMTP("smtp-relay.vladtheemailer.com", 587)
    server.starttls()  # Start TLS for security
    server.login(sender_email, api_key)
    text = message.as_string()
    server.sendmail(sender_email, receiver_email, text)
    print("Email sent successfully")
except Exception as e:
    print(f"Failed to send email: {e}")
finally:
    server.quit()

# if you like to use some library:
# install via pip install yagmail (or other package manager)
import yagmail

# Email details
sender_email = "your.sender@yourdomain.com"
receiver_email = "receiver@example.com"
subject = "Testing my email"
body = "Body of my email"

# Create yagmail SMTP client
yag = yagmail.SMTP(user=sender_email, password="your-vlad-the-emailer-api-key")

# Send the email
try:
    yag.send(to=receiver_email, subject=subject, contents=body)
    print("Email sent successfully")
except Exception as e:
    print(f"Failed to send email: {e}")
