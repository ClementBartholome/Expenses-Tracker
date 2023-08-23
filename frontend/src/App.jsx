import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import { ExpenseProvider } from "./contexts/ExpenseContext";

export default function App() {
  return (
    <Router>
      <ExpenseProvider>
        <RoutesConfig />
      </ExpenseProvider>
    </Router>
  );
}
