<?php

class ExpenseManager extends Model {

    /**
     * Get expenses for a specific month and year.
     *
     * @param int $month The month (1-12).
     * @param int $year The year.
     * @return array An array of expenses.
     */
    public function getMonthlyExpenses(int $month, int $year): array {
        $sql = "SELECT id, description, amount, date, category FROM expenses WHERE MONTH(date) = ? AND YEAR(date) = ? ORDER BY date DESC" ;
        $params = array($month, $year);
        $stmt = $this->executeRequest($sql, $params);
        $expensesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        $expenses = [];
        foreach ($expensesData as $expenseData) {
            $expense = new Expense();
            $expense->hydrate($expenseData);
            $expenses[] = $expense;
        }
    
        return $expenses;
    }
  

    /**
     * Add an expense.
     *
     * @param string $description The description of the expense.
     * @param float $amount The amount of the expense.
     * @param string $date The date of the expense in "Y-m-d" format.
     * @return bool True if the expense was added successfully, false otherwise.
     */
    public function addExpense(string $description, float $amount, string $date, string $category): bool {
        $formattedDate = date("Y-m-d", strtotime($date));
        $sql = "INSERT INTO expenses (description, amount, date, category) VALUES (?, ?, ?, ?)";
        $params = array($description, $amount, $formattedDate, $category);
        
        try {
            $this->executeRequest($sql, $params);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
    

    /**
     * Delete an expense.
     *
     * @param int $expenseId The ID of the expense to delete.
     * @return bool True if the expense was deleted successfully, false otherwise.
     */
    public function deleteExpense(int $expenseId): bool {
        $sql = "DELETE FROM expenses WHERE id = ?";
        $params = array($expenseId);
        
        try {
            $this->executeRequest($sql, $params);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}
