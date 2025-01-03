const Expense = require("../module/expense");

// Add new expense
const addExpense = async (req, res) => {
  const { amount, description, category, date } = req.body;
  const userId = req.userId; 
  console.log("userId" , userId)

  const newExpense = new Expense({
    amount,
    description,
    category,
    date,
    user: userId,
  });

  try {
    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense", error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params; 
  const { amount, description, category, date } = req.body;
  const userId = req.userId; 

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId }, 
      { amount, description, category, date }, 
      { new: true } 
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense });
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense", error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params; 
  const userId = req.userId; 

  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      user: userId,
    });

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense", error: error.message });
  }
};

const getExpenses = async (req, res) => {
  const userId = req.userId; 

  try {
    const expenses = await Expense.find({ user: userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses", error: error.message });
  }
};

const User  = {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
module.exports = User;