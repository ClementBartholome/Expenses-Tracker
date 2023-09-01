import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateTotalExpenses, formatMonthToFrench } from "../utils/Utils";
import { getMonthlyExpenses } from "../components/api"; // Import the API function
import ExpenseChart from "../components/ExpenseChart";

export default function ViewCategory() {
  const { category } = useParams();

  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    // Function to calculate the total expenses for a category for each month
    const calculateCategoryTotals = async () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const totals = {};

      // Loop through each month of the current year
      for (let month = 1; month <= 12; month++) {
        // Fetch monthly expenses for the current month and year for the selected category
        const data = await getMonthlyExpenses(month, currentYear);

        // Filter expenses for the selected category
        const filteredExpenses = data.filter(
          (expense) => expense.category === category
        );

        // Calculate the total expenses for the selected category
        const total = calculateTotalExpenses(filteredExpenses);

        // Get the formatted month name using the formatMonthToFrench function
        const monthName = formatMonthToFrench(month);

        // Store the total in the totals object
        totals[monthName] = total;
      }

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

      // Set the categoryTotals state with the transformed data
      setCategoryTotals(chartData);
    };

    calculateCategoryTotals();
  }, [category]);

  return (
    <main>
      <h2>{category}</h2>
      <ExpenseChart data={categoryTotals} />
    </main>
  );
}
