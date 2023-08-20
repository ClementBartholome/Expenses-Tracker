<?php
require_once 'models/Expense.php';

class ExpenseController {
    private $expenseModel;

    public function __construct() {
        $this->expenseModel = new Expense();
    }

    public function getAllExpenses() {
        $currentMonth = date("m", strtotime($this->getCurrentMonth()));
        $expenses = $this->expenseModel->getAllExpensesByMonth($currentMonth);
        echo json_encode($expenses);
    }

    

    private function getCurrentMonth() {
        return date("Y-m-d", strtotime($_GET['month'] ?? 'now'));
    }
    

    public function addExpense() {
        $description = $_POST["description"];
        $amount = $_POST["amount"];
        $date = $_POST["date"];

        $result = $this->expenseModel->addExpense($description, $amount, $date);
        if ($result) {
            echo "Expense added successfully";
        } else {
            echo "Error adding expense";
        }
    }  

    public function deleteExpense() {
        $data = json_decode(file_get_contents('php://input'), true);
        $expenseId = $data['id'];
    
        $result = $this->expenseModel->deleteExpense($expenseId);
        if ($result) {
            echo "Expense deleted successfully";
        } else {
            echo "Error deleting expense";
        }
    }
}
