import React from "react";
import Header from "../components/Header";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <ExpenseForm />
        <ExpenseList />
      </main>
    </>
  );
}
