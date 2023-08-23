<?php

session_start();

require_once "Controllers/ExpenseController.php";
require_once "Routes/Router.php";

$router = new Router();
$router->routerRequest();