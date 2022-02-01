<?php 
//receber dados do front
$lat = $_GET["lat"];
$long = $_GET["long"];

$key = "46b168a87d2c626584763b9c08808cfc";
$url = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$long&appid=$key";

//requisição ao webservice
$response = file_get_contents($url);

//enviar resposta ao front
print $response;

?>