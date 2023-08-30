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
  const [startX, setStartX] = useState(0); // Initial X position of the mouse pointer or touch event
  const [startScrollLeft, setStartScrollLeft] = useState(0); // Initial horizontal scroll position

  // Event handler when the mouse button is pressed or touch event starts
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX); // Store initial X position of mouse or touch event
    setStartScrollLeft(filterButtonsContainerRef.current.scrollLeft); // Store initial scroll position
  };

  // Event handler when the mouse button is released or touch event ends
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Event handler when the mouse is moving or touch event is moving
  const handleMouseMove = (e) => {
    if (!isDragging) return; // If not dragging, exit
    const deltaX = ((e.clientX || e.touches[0].clientX) - startX) * 2; // Calculate change in X position, adjust scrolling speed
    filterButtonsContainerRef.current.scrollLeft = startScrollLeft - deltaX; // Update the scroll position based on the calculated change
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
