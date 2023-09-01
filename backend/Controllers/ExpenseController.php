<?php

class ExpenseController {
    private ExpenseManager $expenseManager;

    public function __construct() {
        $this->expenseManager = new ExpenseManager();
    }
    public function getMonthlyExpenses(int $month, int $year) {
        $expenses = $this->expenseManager->getMonthlyExpenses($month, $year);
        echo json_encode($expenses); 
    }

    public function addExpense() {
        $description = $_POST["description"];
        $amount = $_POST["amount"];
        $date = $_POST["date"];
        $category = $_POST["category"];

        $result = $this->expenseManager->addExpense($description, $amount, $date, $category);
        if ($result) {
            echo "Expense added successfully";
        } else {
            echo "Error adding expense";
        }
    }  

    public function deleteExpense() {
        $data = json_decode(file_get_contents('php://input'), true);
        $expenseId = $data['id'];
    
        $result = $this->expenseManager->deleteExpense($expenseId);
        if ($result) {
            echo "Expense deleted successfully";
        } else {
            echo "Error deleting expense";
        }
    }
}
