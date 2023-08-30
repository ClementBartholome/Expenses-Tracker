<?php

class BudgetManager extends Model {

    /**
     * Get the budget for a specific month and year.
     *
     * @param int $month The month (1-12).
     * @param int $year The year.
     * @return Budget|null The budget for the specified month and year, or null if not found.
     */
    public function getBudgetForMonth(int $month, int $year): ?Budget {
        $sql = "SELECT id, month, year, budget FROM monthly_budgets WHERE month = ? AND year = ?";
        $params = array($month, $year);
        $stmt = $this->executeRequest($sql, $params);
        $budgetData = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$budgetData) {
            return null;
        }
        
        $budget = new Budget();
        $budget->hydrate($budgetData);
        return $budget;
    }

    /**
     * Add or update a budget for a specific month and year.
     *
     * @param int $month The month (1-12).
     * @param int $year The year.
     * @param float $budgetAmount The budget amount.
     * @return bool True if the budget was added or updated successfully, false otherwise.
     */
    public function addOrUpdateBudget(int $month, int $year, float $budgetAmount): bool {
        $sql = "INSERT INTO monthly_budgets (month, year, budget)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE budget = VALUES(budget)";
        $params = array($month, $year, $budgetAmount);
        
        try {
            $this->executeRequest($sql, $params);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
    
}