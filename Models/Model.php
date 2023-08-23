<?php
require_once 'Config/Configuration.php';

abstract class Model {
    private static $bdd;

    protected function executeRequest(string $sql, ?array $params = null): PDOStatement {
        if ($params === null) {
            $result = self::getBdd()->query($sql);
        } else {
            $result = self::getBdd()->prepare($sql);
            $result->execute($params);
        }
        return $result;
    }

    private static function getBdd(): PDO {
        // Check if the connection has already been created
        if (self::$bdd === null) {
            // Retrieve database configuration parameters
            $dsn = Configuration::get("dsn");
            $login = Configuration::get("login");
            $password = Configuration::get("password");
            // Create the database connection
            self::$bdd = new PDO($dsn, $login, $password, 
                    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        }
        return self::$bdd;
    }
}
