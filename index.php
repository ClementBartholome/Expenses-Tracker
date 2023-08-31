<?php

session_start();

require_once "./backend/Config/autoload.php";

$router = new Router();
$router->routerRequest();