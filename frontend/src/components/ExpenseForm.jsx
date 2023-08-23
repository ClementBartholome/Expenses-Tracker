import React, { useState, useContext } from "react";
import ExpenseContext from "../contexts/ExpenseContext";

export default function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { handleAddExpense } = useContext(ExpenseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddExpense(description, amount, date, category);
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
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
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Ajouter la dépense</button>
      </form>
    </>
  );
}
