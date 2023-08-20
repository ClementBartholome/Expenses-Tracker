const baseUrl = "http://localhost/expense_tracker/";

export async function getAllExpenses() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}

export async function getExpensesByMonth(month) {
  try {
    const formattedMonth = `${month.getFullYear()}-${month.getMonth() + 1}`;
    const response = await fetch(`${baseUrl}month?${formattedMonth}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
}

export async function addExpense(description, amount, date) {
  try {
    const response = await fetch(baseUrl, {
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
    const response = await fetch(baseUrl, {
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
