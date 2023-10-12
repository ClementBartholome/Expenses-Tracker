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
        // Extract expense details from the POST request
        $description = $_POST["description"];
        $amount = $_POST["amount"];
        $date = $_POST["date"];
        $category = $_POST["category"];
    
        // Extract the month and year from the date of the expense
        $month = date("n", strtotime($date)); // 'n' = the month without leading zeros (1-12)
        $year = date("Y", strtotime($date));   // 'Y' = the full year (2023, 2022...)
    
        $result = $this->expenseManager->addExpense($description, $amount, $date, $category, $month, $year);
    
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
