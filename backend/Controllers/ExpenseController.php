<?php
require_once 'models/Expense.php';

class ExpenseController {
    private $expenseModel;

    public function __construct() {
        $this->expenseModel = new Expense();
    }

    // Get the current month from the URL query parameter or default to the current date
    private function getCurrentMonth() {
        return date("Y-m-d", strtotime($_GET['month'] ?? 'now'));
}

    public function getExpensesByMonth() {
    // Get the current month in numeric format (e.g., "08" for August)
    $currentMonth = date("m", strtotime($this->getCurrentMonth()));
    // Fetch expenses for the current month from the model
    $expenses = $this->expenseModel->getExpensesByMonth($currentMonth);
    // Convert the expenses array to JSON format and echo it
    echo json_encode($expenses);
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
