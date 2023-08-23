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
  return date.toLocaleDateString(undefined, options);
}
