<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$textarea = htmlspecialchars($_POST["message"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); 
$time=date("H:i"); 
$myemail = "botaniqyes@gmail.com";

$tema = "Нове замовлення";
$message_to_myemail = "Шановний адмін, Вам надійшло нове замовлення =)
<br><br>
Им`я: $name<br>
Телефон: $tel<br>
Повідомлення: $textarea<br>
Посилання: $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: Computer Genious <botaniqyes@gmail.com> \r\n Reply-To: Computer Genious \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );
?>