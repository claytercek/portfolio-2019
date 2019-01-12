<?php

function sendContactFormToSiteAdmin () {
    try {
      if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
        throw new Exception('Bad form parameters. Check the markup to make sure you are naming the inputs correctly.');
      }
      if (!is_email($_POST['email'])) {
        throw new Exception('Email address not formatted correctly.');
      }
   
      $subject = 'Contact Form: '.$reason.' - '.$_POST['name'];
      $headers[] = 'From: claytercek.com Contact Form <social@claytercek.com>';
      $headers[] = "Reply-To: " .$_POST['name'] . " <" . $_POST['email'] . ">";
      $send_to = get_option('admin_email');
      $subject = "claytercek.com contact form: ".$_POST['name'];
      $message = "Message from ".$_POST['name'].": \n\n ". $_POST['message'] . " \n\n Reply to: " . $_POST['email'];
   
      if (wp_mail($send_to, $subject, $message, $headers)) {
        echo json_encode(array('status' => 'success', 'message' => 'Contact message sent.'));
        exit;
      } else {
        throw new Exception('Failed to send email. Check AJAX handler.');
      }
    } catch (Exception $e) {
      echo json_encode(array('status' => 'error', 'message' => $e->getMessage()));
      exit;
    }
  }
  add_action("wp_ajax_contact_send", "sendContactFormToSiteAdmin");
  add_action("wp_ajax_nopriv_contact_send", "sendContactFormToSiteAdmin");