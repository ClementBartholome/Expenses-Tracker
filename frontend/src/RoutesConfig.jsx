import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewCategory from "./pages/ViewCategory";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:category" element={<ViewCategory />} />
    </Routes>
  );
}
