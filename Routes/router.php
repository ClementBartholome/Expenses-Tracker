<?php
require_once 'controllers/ExpenseController.php';

class Router {
    private $routes = [];

    // Add a new route definition to the router
    public function addRoute($method, $path, $controller, $action) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'controller' => $controller,
            'action' => $action,
        ];
    }

    // Execute the route based on the current request
    public function execute() {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestPath = $_SERVER['REQUEST_URI'];

        // Handle preflight requests for CORS (Cross-Origin Resource Sharing)
        if ($requestMethod === 'OPTIONS') {
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            http_response_code(200);
            return;
        }

        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        // Match the requested route with the defined routes
        foreach ($this->routes as $route) {
            if ($route['method'] === $requestMethod && $route['path'] === $requestPath) {
                // Create an instance of the specified controller
                $controller = new $route['controller'];
                // Call the specified action within the controller
                $action = $route['action'];
                $controller->$action();
                return;
            }
        }
        http_response_code(404);
        echo "Page not found";
    }
}
