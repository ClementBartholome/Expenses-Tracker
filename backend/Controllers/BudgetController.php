<?php

class BudgetController {
    private BudgetManager $budgetManager;

    public function __construct() {
        $this->budgetManager = new BudgetManager();
    }

    public function getBudgetForMonth(int $month, int $year) {
        $budget = $this->budgetManager->getBudgetForMonth($month, $year);
        echo json_encode($budget);
    }

    public function addOrUpdateBudget() {
        $month = intval($_POST['month']);
        $year = intval($_POST['year']);
        $budgetAmount = floatval($_POST['budget']);
        
        $result = $this->budgetManager->addOrUpdateBudget($month, $year, $budgetAmount);
        if ($result) {
            echo "Budget added/updated successfully";
        } else {
            echo "Error adding/updating budget";
        }
    }
}
