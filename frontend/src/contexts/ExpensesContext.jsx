import React, { createContext, useState, useEffect } from "react";
import { getExpensesByMonth } from "../components/api";

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchExpensesByMonth(currentMonth);
  }, [currentMonth]);

  const fetchExpensesByMonth = async (month) => {
    try {
      const expensesData = await getExpensesByMonth(month);
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, setExpenses, currentMonth, setCurrentMonth }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
