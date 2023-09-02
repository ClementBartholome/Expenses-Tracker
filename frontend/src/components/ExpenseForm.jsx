import React, { useState, useContext } from "react";
import ExpenseContext from "../contexts/ExpenseContext";

export default function ExpenseForm() {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { handleAddExpense } = useContext(ExpenseContext);

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <>
      <div className={`expense-form-container ${showForm ? "active" : ""}`}>
        <h2 className="card add-expense-header">
          Ajouter une dépense
          <button
            className={`open-add-expense-form ${showForm ? "active" : ""}`}
            onClick={() => setShowForm(!showForm)}
          ></button>
        </h2>
        {showForm && (
          <div className="overlay">
            <button
              className={`open-add-expense-form ${showForm ? "active" : ""}`}
              onClick={() => setShowForm(!showForm)}
            ></button>
            <form
              className="add-expense-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddExpense(description, amount, date, category);
                resetForm();
              }}
            >
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
                type="text"
                placeholder="Catégorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                maxLength={10}
              />
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button type="submit">Ajouter la dépense</button>
              <button type="button" onClick={resetForm}>
                Réinitialiser les champs
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
