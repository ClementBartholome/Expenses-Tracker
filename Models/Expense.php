<?php
require_once 'Model.php';

class Expense extends Model {

    public function getExpensesForMonth($month, $year) {
        $sql = "SELECT * FROM expenses WHERE MONTH(date) = ? AND YEAR(date) = ?";
        $params = array($month, $year);
        $stmt = $this->executeRequest($sql, $params);
        $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $expenses;
    }
  

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

