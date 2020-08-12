<?php
if(!isset($_POST['submit']))
{
	echo "error; you need to submit the form!";
	}
	$name = $_POST['name'];
	$visitor_email = $_POST['email'];
	$message = $_POST['message'];
	
if(empty($name)||empty($visitor_email))
{
	echo "Name and email are required";
	exit;
	}
	$email_from = "ccordero@americanfreedomins.com";
	$email_subject = "New Bug Report";
	$email_body = "New bug report body from $name.\n".
		"email address: $visitor_email\n".
		"Here is the message:\n $message".
		
	$to = "ccordero@americanfreedomins";
	$headers = "From: $email_from \r\n";
	
	mail($to,$email_subject,$email_body,$headers);