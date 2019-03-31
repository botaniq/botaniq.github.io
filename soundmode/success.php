<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$textarea = htmlspecialchars($_POST["message"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); 
$time=date("H:i"); 
$myemail = "frehauf@ukr.net";

$tema = "Новый заказ";
$message_to_myemail = "Уважаемый Руслан Иванович, Вам поступил новый заказ.
<br><br>
Имя: $name<br>
Телефон: $tel<br>
Сообщение: $textarea<br>
Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: TAKE <frehauf@ukr.net> \r\n Reply-To: TAKE \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );
?>