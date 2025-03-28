<?php
  // Replace with your actual receiving email address
  $receiving_email_address = 'support@dashstudios.tech';

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message_content = htmlspecialchars($_POST['message']);

    // Validate email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo 'Invalid email address';
      exit;
    }

    // Construct the email message
    $message = "Name: $name\n";
    $message .= "Email: $email\n\n";
    $message .= "Message:\n$message_content";

    // Set the email headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($receiving_email_address, $subject, $message, $headers)) {
      echo 'Success';
    } else {
      echo 'Failed to send message';
    }
  } else {
    echo 'Invalid request method';
  }
?>
