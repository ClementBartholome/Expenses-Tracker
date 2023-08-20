import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import { ExpensesProvider } from "./contexts/ExpensesContext";

export default function App() {
  return (
    <Router>
      <ExpensesProvider>
        <RoutesConfig />
      </ExpensesProvider>
    </Router>
  );
}
