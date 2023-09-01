import React, { createContext, useState, useEffect } from "react";
import { deleteExpense, addExpense, getMonthlyExpenses } from "../components/api";
import { calculateTotalExpenses } from "../utils/Utils";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState([]);
  const [originalExpenses, setOriginalExpenses] = useState([]);

  const fetchExpenses = async (month) => {
    try {
      const response = await getMonthlyExpenses(
        month.getMonth() + 1,
        month.getFullYear()
      );
      setExpenses(response);

      // Calculate total expenses using the Utils function
      const total = calculateTotalExpenses(response);
      setTotalExpenses(total);

      // Extract and set categories from expenses
      const uniqueCategories = [
        ...new Set(response.map((expense) => expense.category)),
      ];
      setCategories(uniqueCategories);
      setOriginalExpenses(response);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    const initialMonth = new Date();
    fetchExpenses(initialMonth);
  }, []);

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
      fetchExpenses(currentMonth);
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
        categories,
        fetchExpenses,
        handleDelete,
        handleAddExpense,
        originalExpenses,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
