import React, { useState, useContext } from "react";
import { addExpense, getExpenses } from "./api";
import ExpensesContext from "../contexts/ExpensesContext";

export default function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const { setExpenses } = useContext(ExpensesContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(description, amount, date);
      setDescription("");
      setAmount("");
      setDate("");
      const updatedExpenses = await getExpenses();
      setExpenses(updatedExpenses);
      console.log("Expense added successfully");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      <h2>Ajouter une dépense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Ajouter la dépense</button>
      </form>
    </>
  );
}
