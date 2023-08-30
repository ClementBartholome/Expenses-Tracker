const baseUrl = "http://localhost/expense_tracker/";

export async function getExpenses(month = null, year = null) {
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
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

export async function addExpense(description, amount, date, category) {
  try {
    const response = await fetch(`${baseUrl}?action=add-expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `description=${encodeURIComponent(
        description
      )}&amount=${amount}&date=${date}&category=${category}`,
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

export async function getBudgetForMonth(month, year) {
  try {
    const response = await fetch(
      `${baseUrl}?action=get-budget&month=${month}&year=${year}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}

export async function addOrUpdateBudget(month, year, budget) {
  try {
    const response = await fetch(`${baseUrl}?action=add-or-update-budget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `month=${encodeURIComponent(month)}&year=${encodeURIComponent(
        year
      )}&budget=${encodeURIComponent(budget)}`,
    });

    if (response.ok) {
      console.log("Budget added/updated successfully");
    } else {
      console.error("Error adding/updating budget");
    }
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}

export async function getExpensesByCategory(month, year) {
  try {
    const response = await fetch(
      `${baseUrl}?action=get-expenses-by-category&month=${month}&year=${year}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}
