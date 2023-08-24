import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import { ExpenseProvider } from "./contexts/ExpenseContext";
import { BudgetProvider } from "./contexts/BudgetContext";

export default function App() {
  return (
    <Router>
      <ExpenseProvider>
        <BudgetProvider>
          <RoutesConfig />
        </BudgetProvider>
      </ExpenseProvider>
    </Router>
  );
}
