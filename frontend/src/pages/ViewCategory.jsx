import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  calculateTotalExpenses,
  formatMonthToFrench,
  formatDate,
  formatAmount,
} from "../utils/Utils";
import { getMonthlyExpenses } from "../components/api";
import ExpenseChart from "../components/ExpenseChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ViewCategory() {
  const { category } = useParams();

  const [categoryTotals, setCategoryTotals] = useState({});
  const [categoryExpenses, setCategoryExpenses] = useState([]);

  useEffect(() => {
    // Function to calculate the total expenses for a category for each month
    const calculateCategoryTotals = async () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const totals = {};

      const localCategoryExpenses = [];

      // Loop through each month of the current year
      for (let month = 1; month <= 12; month++) {
        const data = await getMonthlyExpenses(month, currentYear);

        // Filter expenses for the selected category
        const filteredExpenses = data.filter(
          (expense) => expense.category === category
        );

        localCategoryExpenses.push(...filteredExpenses);

        // Calculate the total expenses for the selected category
        const total = calculateTotalExpenses(filteredExpenses);

        // Get the formatted month name using the formatMonthToFrench function
        const monthName = formatMonthToFrench(month);

        // Store the total in the totals object
        totals[monthName] = total;
      }

      setCategoryExpenses(localCategoryExpenses);

      // Transform the data for Chart.js
      const months = [...Object.keys(totals)]; // Extract month names
      const values = Object.values(totals); // Extract values

      const chartData = {
        labels: months,
        datasets: [
          {
            months: months,
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setCategoryTotals(chartData);
    };

    calculateCategoryTotals();
  }, []);

  return (
    <main>
      <FontAwesomeIcon
        icon={faArrowLeft}
        style={{
          fontSize: "1.5rem",
          marginRight: "auto",
          marginTop: "20px",
          cursor: "pointer",
        }}
        className="margin-layout"
        onClick={() => window.history.back()}
      />
      <h2 className="margin-layout">{category}</h2>
      <ExpenseChart data={categoryTotals} />
      <ul className="flex-column-reverse">
        {categoryExpenses.map((expense) => (
          <li key={expense.id}>
            <div className="expense-description flex-column">
              <span title={expense.description}>{expense.description}</span>
              <span className="italic">{formatDate(expense.date)}</span>
            </div>
            <span className="expense-amount bold">
              {formatAmount(expense.amount)}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
