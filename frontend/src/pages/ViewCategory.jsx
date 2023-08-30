import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseContext from "../contexts/ExpenseContext";
import { calculateTotalExpenses } from "../utils/Utils";

export default function ViewCategory() {
  const { category } = useParams();
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const { originalExpenses, setTotalExpenses } = useContext(ExpenseContext);

  const fetchExpensesByCategory = (category) => {
    const filteredExpenses = originalExpenses.filter(
      (expense) => expense.category === category
    );
    setCategoryExpenses(filteredExpenses);
    const total = calculateTotalExpenses(filteredExpenses);
    setTotalExpenses(total);
  };

  useEffect(() => {
    fetchExpensesByCategory(category);
  }, [categoryExpenses, category]);

  return (
    <main>
      {categoryExpenses.length > 0 ? (
        <div className="margin-layout">
          <h2>{category}</h2>
          <h3>Dépenses totales</h3>
          <p>{calculateTotalExpenses(categoryExpenses)}</p>
          <ul>
            {categoryExpenses.map((expense) => (
              <li key={expense.id}>
                <div className="expense-description flex-column">
                  <span title={expense.description}>{expense.description}</span>
                  <span className="italic">{expense.date}</span>
                </div>
                <span className="expense-amount bold">{expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2 className="margin-layout">No expenses for this category</h2>
      )}
    </main>
  );
}
