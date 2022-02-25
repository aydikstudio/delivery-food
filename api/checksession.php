<?php
require 'config.php';
if(isset($_GET)) {
    if($_GET["type"] == "checksession") {
    if(isset($_SESSION['phone'])) {
        echo "yes";
    } else {
        echo "no";
    }   
}
}



?>