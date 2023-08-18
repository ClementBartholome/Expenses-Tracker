<?php
require_once 'controllers/ExpenseController.php';

class Router {
    private $routes = [];

    public function addRoute($method, $path, $controller, $action) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'controller' => $controller,
            'action' => $action,
        ];
    }

    public function execute() {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestPath = $_SERVER['REQUEST_URI'];

        foreach ($this->routes as $route) {
            if ($route['method'] === $requestMethod && $route['path'] === $requestPath) {
                $controller = new $route['controller'];
                $action = $route['action'];
                $controller->$action();
                return;
            }
        }
        // If no route matches, page not found
        http_response_code(404);
        echo "Page not found";
    }
}