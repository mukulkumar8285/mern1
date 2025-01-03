import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';

const Dashboard = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios
      .get("https://mern1-delta.vercel.app/", {
        headers: { Authorization: localStorage.getItem("authorization") },
      })
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://mern1-delta.vercel.app/${id}`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      })
      .then(() => {
        fetchExpenses();
        console.log("Expense deleted successfully");
      })
      .catch((error) => console.error("Error deleting expense:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = { amount, description, category, date };

    axios
      .post("https://mern1-delta.vercel.app/", expenseData, {
        headers: { Authorization: localStorage.getItem("authorization") },
      })
      .then(() => {
        fetchExpenses();
        setAmount("");
        setDescription("");
        setCategory("");
        setDate("");
      })
      .catch((error) => console.error("Error adding expense:", error));
  };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = ["Amount", "Description", "Category", "Date"];
    csvRows.push(headers.join(","));

    expenses.forEach((expense) => {
      const row = [
        expense.amount,
        expense.description,
        expense.category,
        new Date(expense.date).toLocaleDateString(),
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>

      <h2>Expense List</h2>
      <button onClick={downloadCSV}>Download CSV</button>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
