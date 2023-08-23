const baseUrl = "http://localhost/expense_tracker/";

export async function getExpenses(month = null, year = null) {
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Les mois sont indexés à partir de 0
    const currentYear = now.getFullYear();

    const fetchUrl =
      month && year
        ? `${baseUrl}?month=${month}&year=${year}`
        : `${baseUrl}?month=${currentMonth}&year=${currentYear}`;

    const response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}

export async function addExpense(description, amount, date) {
  try {
    const response = await fetch(`${baseUrl}?action=add-expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `description=${encodeURIComponent(
        description
      )}&amount=${amount}&date=${date}`,
    });

    if (response.ok) {
      console.log("Expense added successfully");
    } else {
      console.error("Error adding expense");
    }
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}

export async function deleteExpense(expenseId) {
  try {
    const response = await fetch(`${baseUrl}?action=delete-expense`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: expenseId }),
    });

    if (response.ok) {
      console.log("Expense deleted successfully");
    } else {
      console.error("Error deleting expense");
    }
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}
