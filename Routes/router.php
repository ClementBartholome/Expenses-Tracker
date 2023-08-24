<?php
require_once 'Controllers/ExpenseController.php';
require_once "Controllers/BudgetController.php";

class Router {

    private $ctrlexpense;
    private $ctrlbudget;

    public function __construct() {
        $this->ctrlexpense = new ExpenseController();
        $this->ctrlbudget = new BudgetController();
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
                    case 'add-or-update-budget':
                        $this->ctrlbudget->addOrUpdateBudget();
                        break;
                    case 'get-budget':
                        $month = intval($_GET['month']);
                        $year = intval($_GET['year']);
                        $this->ctrlbudget->getBudgetForMonth($month, $year);
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
