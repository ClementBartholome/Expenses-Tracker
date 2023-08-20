import React, { useState, useContext } from "react";
import { addExpense, getAllExpenses } from "./api";
import ExpensesContext from "../contexts/ExpensesContext";

export default function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const { setExpenses } = useContext(ExpensesContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(description, amount, date);
    setDescription("");
    setAmount("");
    setDate("");
    const updatedExpenses = await getAllExpenses();
    setExpenses(updatedExpenses);
  };

  return (
    <>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
    </>
  );
}
