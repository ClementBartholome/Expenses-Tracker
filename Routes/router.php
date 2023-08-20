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

        // Handle preflight requests
        if ($requestMethod === 'OPTIONS') {
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            http_response_code(200);
            return;
        }

        // Set CORS headers for actual requests
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        foreach ($this->routes as $route) {
            if ($route['method'] === $requestMethod && $route['path'] === $requestPath) {
                $controller = new $route['controller'];
                $action = $route['action'];
                $controller->$action();
                return;
            }
        }
        http_response_code(404);
        echo "Page not found";
    }
}

