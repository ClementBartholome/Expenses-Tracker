import React, { useContext } from "react";
import { deleteExpense, getAllExpenses } from "./api";
import ExpensesContext from "../contexts/ExpensesContext";

export default function ExpenseList() {
  const { expenses, setExpenses, currentMonth, setCurrentMonth } =
    useContext(ExpensesContext);

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

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  return (
    <>
      <h2>Expenses</h2>
      <button onClick={handlePrevMonth}>Mois précédent</button>
      <button onClick={handleNextMonth}>Mois suivant</button>
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
