import React, { useContext } from "react";
import ExpenseContext from "../contexts/ExpenseContext";
import BudgetContext from "../contexts/BudgetContext";
import { formatAmount, formatDate, formatMonth } from "../utils/Utils";

export default function ExpenseList() {
  const {
    expenses,
    currentMonth,
    setCurrentMonth,
    totalExpenses,
    fetchExpenses,
    handleDelete,
  } = useContext(ExpenseContext);

  const {
    budget,
    editingBudget,
    setBudget,
    handleEditBudget,
    handleAddOrUpdateBudget,
  } = useContext(BudgetContext);

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
      <h2>Dépenses du mois de : {formatMonth(currentMonth)}</h2>
      <h3>Total des dépenses : {formatAmount(totalExpenses)}</h3>
      {editingBudget ? (
        <>
          <div className="budget">
            <h3>Budget du mois :</h3>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <button
            onClick={() =>
              handleAddOrUpdateBudget(
                currentMonth.getMonth() + 1,
                currentMonth.getFullYear(),
                budget
              )
            }>
            Enregistrer le nouveau budget
          </button>
        </>
      ) : (
        <>
          <div className="budget">
            <h3>Budget du mois : {formatAmount(budget)}</h3>
            <button onClick={handleEditBudget}>Éditer le budget</button>
          </div>
          <button onClick={handlePrevMonth}>Mois précédent</button>
          <button onClick={handleNextMonth}>Mois suivant</button>
        </>
      )}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}
            <span>{formatAmount(expense.amount)}</span>
            <span>{formatDate(expense.date)}</span>
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
