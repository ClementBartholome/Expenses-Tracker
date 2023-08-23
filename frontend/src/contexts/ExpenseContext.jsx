import React, { createContext, useState, useEffect, useCallback } from "react";
import { getExpenses, deleteExpense, addExpense } from "../components/api";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchExpenses = useCallback(
    async (month) => {
      try {
        const response = await getExpenses(
          month.getMonth() + 1,
          month.getFullYear()
        );
        setExpenses(response);

        // Calculate total expenses
        const total = response.reduce((acc, expense) => {
          const numericAmount = parseFloat(expense.amount);
          return acc + numericAmount;
        }, 0);
        setTotalExpenses(total); // Update total expenses
      } catch (error) {
        console.error("An error occurred", error);
      }
    },
    [setExpenses]
  );

  useEffect(() => {
    const initialMonth = new Date();
    fetchExpenses(initialMonth);
  }, [fetchExpenses]);

  const handleDelete = async (expenseId) => {
    console.log("Deleting expense with ID:", expenseId);
    try {
      await deleteExpense(expenseId);
      fetchExpenses(currentMonth);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleAddExpense = async (description, amount, date, category) => {
    try {
      await addExpense(description, amount, date, category);
      const updatedExpenses = await getExpenses(
        currentMonth.getMonth() + 1,
        currentMonth.getFullYear()
      );
      setExpenses(updatedExpenses);
      console.log("Expense added successfully");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        currentMonth,
        setCurrentMonth,
        totalExpenses,
        setTotalExpenses,
        fetchExpenses,
        handleDelete,
        handleAddExpense,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
