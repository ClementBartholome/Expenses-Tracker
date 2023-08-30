<?php

session_start();

require_once "Config/autoload.php";

$router = new Router();
$router->routerRequest();