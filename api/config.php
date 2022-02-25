<?php
session_start();
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
  $mysqli = new mysqli('localhost', 'mysql', 'mysql', 'delivery-food');
  if (mysqli_connect_errno()) {
    echo "Подключение невозможно: ".mysqli_connect_error();
  }

?>