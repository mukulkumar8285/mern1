const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userexpense", 
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now 
  }
});


const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
