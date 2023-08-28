import React, { useContext, useState, useRef } from "react";
import ExpenseContext from "../contexts/ExpenseContext";

export default function FilterButtons() {
  const { originalExpenses, setExpenses, categories } =
    useContext(ExpenseContext);

  const [activeFilter, setActiveFilter] = useState("Tout");

  const filterButtonsContainerRef = useRef(null);

  const filterExpenses = (category) => {
    setActiveFilter(category);
    if (category === "Tout") {
      setExpenses(originalExpenses);
    } else {
      const filteredExpenses = originalExpenses.filter(
        (expense) => expense.category === category
      );
      setExpenses(filteredExpenses);
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // Event handler when the mouse button is pressed
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
    setStartScrollLeft(filterButtonsContainerRef.current.scrollLeft);
  };

  // Event handler when the mouse button is released
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Event handler when the mouse is moving
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = ((e.clientX || e.touches[0].clientX) - startX) * 2; // Adjust scrolling speed
    filterButtonsContainerRef.current.scrollLeft = startScrollLeft - deltaX;
  };

  return (
    <div className="filter-buttons-container">
      <div
        className="filter-buttons"
        ref={filterButtonsContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleMouseMove}>
        <button
          className={activeFilter === "Tout" ? "active-filter" : ""}
          onClick={() => filterExpenses("Tout")}>
          Tout
        </button>
        {[...categories].map((category) => (
          <button
            key={category}
            className={activeFilter === category ? "active-filter" : ""}
            onClick={() => filterExpenses(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
