<?php
require_once 'Model.php';

class Expense extends Model {

    /**
     * Get expenses for a specific month and year.
     *
     * @param int $month The month (1-12).
     * @param int $year The year.
     * @return array An array of expenses.
     */
    public function getExpensesForMonth(int $month, int $year): array {
        $sql = "SELECT * FROM expenses WHERE MONTH(date) = ? AND YEAR(date) = ?";
        $params = array($month, $year);
        $stmt = $this->executeRequest($sql, $params);
        $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
    public function addExpense(string $description, float $amount, string $date): bool {
        $formattedDate = date("Y-m-d", strtotime($date));
        $sql = "INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)";
        $params = array($description, $amount, $formattedDate);
        
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
