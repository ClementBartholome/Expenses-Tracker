import React, { useContext } from "react";
import { deleteExpense, getAllExpenses } from "./api";
import ExpensesContext from "../contexts/ExpensesContext";

export default function ExpenseList() {
  const { expenses, setExpenses } = useContext(ExpensesContext);

  const handleDelete = async (expenseId) => {
    console.log("Deleting expense with ID:", expenseId);
    try {
      await deleteExpense(expenseId);
      const updatedExpenses = await getAllExpenses();
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}
            <span>{expense.amount}€</span>
            <span>{expense.date}</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(expense.id)}></button>
          </li>
        ))}
      </ul>
    </>
  );
}
