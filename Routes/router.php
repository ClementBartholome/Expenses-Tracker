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
                    case 'delete-expense': // Ajout de cette clause
                            $this->ctrlexpense->deleteExpense();
                            break;
                    default:
                        throw new Exception("Action non valide");
                }
            } else if (isset($_GET['month']) && isset($_GET['year'])) {
                $month = intval($_GET['month']);
                $year = intval($_GET['year']);
                $this->ctrlexpense->getExpensesForMonth($month, $year);
            } else {
                throw new Exception("Action non valide");
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
