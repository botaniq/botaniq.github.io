<?php
header("Content-Type: text/html; charset=utf-8");
$emil = htmlspecialchars($_POST["Пошта"]);
// $name = htmlspecialchars($_POST["Имя"]);
// $tel = htmlspecialchars($_POST["Телефон"]);
// $select = htmlspecialchars($_POST["Тип-бронирования"]);
// $textarea = htmlspecialchars($_POST["Сообщение"]);


$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
// $myemail = "matchpoint-club@mail.ru";
$myemail = "botaniqyes@gmail.com";



$tema = "Новая подписка";
$message_to_myemail = "Уважаемый Администратор, Вам поступила новая подписка:
<br><br>
Пошта: $emil<br>
Источник (ссылка): $refferer
";

// mail($myemail, $tema, $message_to_myemail, "From: МАТЧПОИНТ <matchpoint-club@mail.ru> \r\n Reply-To: МАТЧПОИНТ \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


mail($myemail, $tema, $message_to_myemail, "From: TAKE <botaniqyes@gmail.com> \r\n Reply-To: TAKE \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


$tema = "Ваш подписка принята";
$message_to_myemail = "Спасибо за подписку! Наш менеджер Вам благодарен";
$myemail = $email;
mail($myemail, $tema, $message_to_myemail, "From: TAKE <botaniqyes@gmail.com> \r\n Reply-To: TAKE \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );
?>