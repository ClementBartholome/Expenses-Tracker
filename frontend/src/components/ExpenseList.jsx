import React, { useContext } from "react";
import ExpenseContext from "../contexts/ExpenseContext";
import { formatAmount, formatDate } from "../utils/Utils";
import FilterButtons from "./FilterButtons";

export default function ExpenseList() {
  const {
    expenses,
    currentMonth,
    setCurrentMonth,
    fetchExpenses,
    handleDelete,
  } = useContext(ExpenseContext);

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

  return (
    <>
      <div className="month-buttons">
        <button onClick={handlePrevMonth}>Mois précédent</button>
        <button onClick={handleNextMonth}>Mois suivant</button>
      </div>
      <FilterButtons />
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}
            <span className="bold">{formatAmount(expense.amount)}</span>
            <span className="italic">{formatDate(expense.date)}</span>
            <span className="category">{expense.category}</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(expense.id)}></button>
          </li>
        ))}
      </ul>
    </>
  );
}
