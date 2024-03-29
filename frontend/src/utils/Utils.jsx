export function formatAmount(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(date));
}

export function formatMonth(date) {
  const options = { year: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const formattedMonth =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return formattedMonth;
}

export function remainingBudget(budget, totalExpenses) {
  return budget - totalExpenses;
}

export function calculateTotalExpenses(expenses) {
  return expenses.reduce((total, expense) => {
    const numericAmount = parseFloat(expense.amount);
    return total + numericAmount;
  }, 0);
}

export function formatMonthToFrench(month) {
  const monthNames = [
    "Janv",
    "Févr",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];

  return monthNames[month - 1];
}
