import React, { useContext } from "react";
import ExpenseContext from "../contexts/ExpenseContext";
import BudgetContext from "../contexts/BudgetContext";
import { formatAmount, formatMonth, remainingBudget } from "../utils/Utils";

export default function Budget() {
  const { currentMonth, totalExpenses } = useContext(ExpenseContext);

  const {
    budget,
    editingBudget,
    setBudget,
    handleEditBudget,
    handleAddOrUpdateBudget,
  } = useContext(BudgetContext);

  return (
    <>
      <h2>Dépenses du mois de : {formatMonth(currentMonth)}</h2>
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
        </>
      )}
      <div className="budget-recap">
        <h3>Total des dépenses : {formatAmount(totalExpenses)}</h3>
        <h3>
          Budget restant :{" "}
          {formatAmount(remainingBudget(budget, totalExpenses))}
        </h3>
      </div>
    </>
  );
}
