<?php
require_once 'Model.php';

class Expense extends Model {
    
    public function getExpensesByMonth(string $month): array {
        // SQL query to retrieve expenses for the given month
        $sql = "SELECT * FROM expenses WHERE MONTH(date) = ?";
        
        // Execute the SQL query with the provided month parameter
        $result = $this->executeRequest($sql, array($month));
        
        // Fetch all the rows returned by the query as an associative array
        $expenses = $result->fetchAll(PDO::FETCH_ASSOC);
        
        // Convert the date format of each expense to "day/month/year"
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

