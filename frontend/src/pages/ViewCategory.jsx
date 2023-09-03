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
import {
  faArrowLeft,
  faCalendar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export default function ViewCategory() {
  const { category } = useParams();

  const [categoryTotals, setCategoryTotals] = useState({});
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [last30DaysTotal, setLast30DaysTotal] = useState(0); // State to store the total for the last 30 days
  const [monthlyAverage, setMonthlyAverage] = useState(0); // State to store the average monthly total

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

        // Store the total for the month in the totals object
        totals[monthName] = total;
      }

      setCategoryExpenses(localCategoryExpenses);

      // Calculate the total for the last 30 days
      const last30DaysExpenses = localCategoryExpenses.filter((expense) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(expense.date) >= thirtyDaysAgo;
      });
      const last30DaysTotal = calculateTotalExpenses(last30DaysExpenses);
      setLast30DaysTotal(last30DaysTotal);

      // Calculate the average monthly expense
      // Calculate the average monthly expense for the last six months
      const lastSixMonths = Object.keys(totals).slice(-6);
      const totalLastSixMonths = lastSixMonths.reduce(
        (acc, month) => acc + totals[month],
        0
      );
      const monthlyAverage = totalLastSixMonths / lastSixMonths.length;

      setMonthlyAverage(monthlyAverage);

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
      <div className="category-cards">
        {/* Display the total for the last 30 days */}
        <div className="card margin-layout wd-50 fit-content">
          <h3>30 derniers jours</h3>
          <div className="flex-row center space-b">
            <p className="bold">{formatAmount(last30DaysTotal)}</p>
            <FontAwesomeIcon
              icon={faCalendar}
              style={{
                fontSize: "1.5rem",
              }}
            />
          </div>
        </div>
        {/* Display the average monthly expense */}
        <div className="card margin-layout wd-50 fit-content">
          <h3>Moyenne Mensuelle</h3>
          <div className="flex-row center space-b">
            <p className="bold">{formatAmount(monthlyAverage)}</p>
            <FontAwesomeIcon
              icon={faChartLine}
              style={{
                fontSize: "1.5rem",
              }}
            />
          </div>
        </div>
      </div>
      <ExpenseChart data={categoryTotals} />
      <h2 className="margin-layout">Dernières dépenses</h2>
      <ul className="mb-20">
        {categoryExpenses
          .slice() // Create a copy of the array
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((expense) => (
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
