<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

session_start();

require_once "./backend/Config/autoload.php";

$router = new Router();
$router->routerRequest();