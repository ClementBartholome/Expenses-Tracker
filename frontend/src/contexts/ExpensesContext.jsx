import React, { createContext, useState, useEffect } from "react";
import { getExpenses } from "../components/api";

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  const fetchAllExpenses = async () => {
    try {
      const expensesData = await getExpenses();
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
