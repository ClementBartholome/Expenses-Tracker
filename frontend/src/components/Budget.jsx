import React, { useContext, useState, useEffect } from "react";
import ExpenseContext from "../contexts/ExpenseContext";
import BudgetContext from "../contexts/BudgetContext";
import { formatAmount, formatMonth, remainingBudget } from "../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faWallet } from "@fortawesome/free-solid-svg-icons";

export default function Budget() {
  const { currentMonth, totalExpenses } = useContext(ExpenseContext);

  const { budget, editingBudget, handleEditBudget, handleAddOrUpdateBudget } =
    useContext(BudgetContext);

  const [newBudget, setNewBudget] = useState(budget);

  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  return (
    <div className="budget-card">
      <h2>{formatMonth(currentMonth)}</h2>
      <div className="budget">
        <div className="budget-container">
          <h3>Budget du mois</h3>
          {editingBudget ? (
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
          ) : (
            <h3>{formatAmount(budget)}</h3>
          )}
        </div>
        {editingBudget ? (
          <button
            onClick={() =>
              handleAddOrUpdateBudget(
                currentMonth.getMonth() + 1,
                currentMonth.getFullYear(),
                newBudget
              )
            }>
            Enregistrer le nouveau budget
          </button>
        ) : (
          <button onClick={handleEditBudget}>Éditer le budget</button>
        )}
      </div>
      <div className="budget-recap">
        <div className="expenses">
          <div className="budget-icon">
            <FontAwesomeIcon
              icon={faCircleArrowDown}
              style={{ color: "#ed2626", fontSize: "1.5rem" }}
            />
          </div>
          <div className="flex-column">
            <h3>Dépenses</h3>
            <span className="amount">{formatAmount(totalExpenses)}</span>
          </div>
        </div>
        <div className="remaining-budget">
          <div className="budget-icon">
            <FontAwesomeIcon
              icon={faWallet}
              style={{ color: "#19a41b", fontSize: "1.5rem" }}
            />
          </div>
          <div className="flex-column">
            <h3>Budget restant</h3>
            <span className="amount">
              {formatAmount(remainingBudget(budget, totalExpenses))}
            </span>
          </div>
        </div>
      </div>
      <div className="budget-buttons"></div>
    </div>
  );
}
