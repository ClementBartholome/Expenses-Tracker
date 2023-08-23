<?php
require_once 'Controllers/ExpenseController.php';

class Router {

    private $ctrlexpense;

    public function __construct() {
        $this->ctrlexpense = new ExpenseController();
    }
    
    public function routerRequest() {
        try {
            if (isset($_GET['action'])) {
                $action = $_GET['action'];
                
                switch ($action) {
                    case 'add-expense':
                       $this->ctrlexpense->addExpense();
                        break;

                    case 'delete-expense':
                        $this->ctrlexpense->deleteExpense();
                        break;

                    default:
                        throw new Exception("Action non valide");
                }
            } else {  // no action : display all expenses
                $this->ctrlexpense->getAllExpenses();
            }
        }
        catch (Exception $e) {
            // Gérer l'exception ici
            echo "Une erreur s'est produite : " . $e->getMessage();
        }
    }

    private function getParametre($table, $name) {
        if (isset($table[$name])) {
            return $table[$name];
        }
        else
            throw new Exception("Paramètre '$name' absent");
    }
}
