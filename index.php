<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000'); 
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    http_response_code(204);
    exit;
}

require_once 'routes/router.php';

$router = new Router();

// Define routes
$router->addRoute('GET', '/expense_tracker/', 'ExpenseController', 'getAllExpenses');
$router->addRoute('POST', '/expense_tracker/', 'ExpenseController', 'addExpense');
$router->addRoute('DELETE', '/expense_tracker/', 'ExpenseController', 'deleteExpense');
$router->addRoute('GET', '/expense_tracker/month', 'ExpenseController', 'getExpensesByMonth');


// Execute the route
$router->execute();
