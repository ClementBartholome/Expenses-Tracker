import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function ExpenseChart({ data }) {
  const chartRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    if (chartRef.current) {
      // If the canvas element exists
      if (chartRef.current.chart) {
        // Check if there's an existing chart
        chartRef.current.chart.destroy(); // Destroy the existing chart
      }

      const ctx = chartRef.current.getContext("2d");

      // Inside your ExpenseChart component
      const newChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          scales: {
            x: {
              grid: {
                display: false, // Hide the x-axis grid lines
              },
            },
            y: {
              display: false, // Hide the y-axis legend
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                title: () => null,
                label: (context) => {
                  const value = context.formattedValue || ""; // Get the value (expense total)
                  return `${value}€`; // Customize the tooltip content
                },
              },
            },
          },
        },
      });

      // Save the chart reference to the canvas element
      chartRef.current.chart = newChart;
    }
  }, [data]);

  return <canvas ref={chartRef} />;
}
