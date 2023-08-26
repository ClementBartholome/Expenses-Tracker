import React, { useContext, useState } from "react";
import ExpenseContext from "../contexts/ExpenseContext";

export default function FilterButtons() {
  const { originalExpenses, setExpenses, categories } =
    useContext(ExpenseContext);

  const [activeFilter, setActiveFilter] = useState("Tout");

  const filterExpenses = (category) => {
    setActiveFilter(category);
    if (category === "Tout") {
      setExpenses(originalExpenses);
    } else {
      const filteredExpenses = originalExpenses.filter(
        (expense) => expense.category === category
      );
      setExpenses(filteredExpenses);
    }
  };

  return (
    <div className="filter-buttons-container">
      <div className="filter-buttons">
        <button
          className={activeFilter === "Tout" ? "active-filter" : ""}
          onClick={() => filterExpenses("Tout")}>
          Tout
        </button>
        {[...categories].map((category) => (
          <button
            key={category}
            className={activeFilter === category ? "active-filter" : ""}
            onClick={() => filterExpenses(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
