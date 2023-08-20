<?php
require_once 'Model.php';

class Expense extends Model {
    public function getAllExpensesByMonth(string $month): array {
        $sql = "SELECT * FROM expenses WHERE MONTH(date) = ?";
        $result = $this->executeRequest($sql, array($month));
        $expenses = $result->fetchAll(PDO::FETCH_ASSOC);
        foreach ($expenses as &$expense) {
            $expense['date'] = date("d/m/Y", strtotime($expense['date']));
        }
    
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

