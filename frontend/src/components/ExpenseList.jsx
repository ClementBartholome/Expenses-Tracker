import React, { useContext, useEffect, useCallback, useState } from "react";
import { deleteExpense, getExpenses } from "./api";
import ExpensesContext from "../contexts/ExpensesContext";
import { formatAmount, formatDate } from "../utils/Utils";

export default function ExpenseList() {
  const { expenses, setExpenses, currentMonth, setCurrentMonth } =
    useContext(ExpensesContext);

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
          const numericAmount = parseFloat(
            expense.amount.replace(/[^\d.-]/g, "")
          );
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

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
    fetchExpenses(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
    fetchExpenses(nextMonth);
  };

  const getFormattedMonth = (date) => {
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <h2>Dépenses du mois de : {getFormattedMonth(currentMonth)}</h2>
      <h3>Total : {formatAmount(totalExpenses)}</h3>
      <button onClick={handlePrevMonth}>Mois précédent</button>
      <button onClick={handleNextMonth}>Mois suivant</button>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}
            <span>{formatAmount(expense.amount)}</span>
            <span>{formatDate(expense.date)}</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(expense.id)}></button>
          </li>
        ))}
      </ul>
    </>
  );
}
