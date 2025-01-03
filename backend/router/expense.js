const express = require("express");
const User = require("../controller/userexpense");
const AuthMiddleware = require("../middleware/authMiddleware");

const routerexpense = express.Router();

routerexpense.get("/", AuthMiddleware.verifyToken, User.getExpenses);


routerexpense.post("/", AuthMiddleware.verifyToken, User.addExpense);


routerexpense.put("/:expenseId", AuthMiddleware.verifyToken, User.updateExpense);


routerexpense.delete("/:expenseId", AuthMiddleware.verifyToken, User.deleteExpense);

module.exports = routerexpense;

