<?php
class Configuration {
    private static $settings = array(
        "dsn" => "mysql:host=localhost;dbname=expense_tracker",
        "login" => "root",
        "password" => "T6yeefjbw!"
    );

    public static function get($key) {
        if (isset(self::$settings[$key])) {
            return self::$settings[$key];
        }
        return null;
    }
}
