import React, { createContext, useState, useContext, useEffect } from "react";
import { getBudgetForMonth, addOrUpdateBudget } from "../components/api";
import ExpenseContext from "./ExpenseContext";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0); // Initial budget value
  const [editingBudget, setEditingBudget] = useState(false);
  const { currentMonth } = useContext(ExpenseContext);

  const fetchBudgetForMonth = async (month, year) => {
    try {
      const response = await getBudgetForMonth(month, year);
      if (!response) {
        setBudget(0);
        return;
      }
      setBudget(response.budget);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    fetchBudgetForMonth(
      currentMonth.getMonth() + 1,
      currentMonth.getFullYear()
    );
  }, [currentMonth, editingBudget]);

  const handleAddOrUpdateBudget = async (
    currentMonth,
    currentYear,
    newBudget
  ) => {
    try {
      await addOrUpdateBudget(currentMonth, currentYear, newBudget);
      setBudget((prevMonthBudgets) => ({
        ...prevMonthBudgets,
        [`${currentYear}-${currentMonth}`]: newBudget,
      }));
      setEditingBudget(false); // Disable editing mode after saving
      console.log("Budget added/updated successfully");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleEditBudget = () => {
    setEditingBudget(true); // Activate editing mode
  };

  return (
    <BudgetContext.Provider
      value={{
        fetchBudgetForMonth,
        handleAddOrUpdateBudget,
        budget,
        setBudget,
        editingBudget,
        handleEditBudget,
      }}>
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetContext;
