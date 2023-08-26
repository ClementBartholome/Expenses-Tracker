import React from "react";
// import Header from "../components/Header";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Budget from "../components/Budget";

export default function HomePage() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Budget />
        <ExpenseList />
        <ExpenseForm />
      </main>
    </>
  );
}
