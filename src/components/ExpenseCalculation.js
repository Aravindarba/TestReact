import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ detail: '', amount: 0.0, extype: 'Profit' });
  const [initialAmount, setInitialAmount] = useState(0);
  const [filter, setFilter] = useState('All');
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ product: '', price: 0 });

  const handleAddExpense = () => {
    if (!isNaN(newExpense.amount)) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ detail: '', amount: 0, extype: 'Profit' });
    }
  };

  const handleAddGoal = () => {
    if (!isNaN(newGoal.price)) {
      setGoals([...goals, newGoal]);
      setNewGoal({ product: '', price: 0 });
    }
  };

  const filteredExpenses = filter === 'All' ? expenses : expenses.filter(expense => expense.extype === filter);

  const totalProfit = expenses.filter(expense => expense.extype === 'Profit').reduce((a, b) => a + parseFloat(b.amount), 0);
  const totalLoss = expenses.filter(expense => expense.extype === 'Loss').reduce((a, b) => a + parseFloat(b.amount), 0);
  const remainingAmount = initialAmount + totalProfit - totalLoss;

  return (
    <div style={{ overflowY: 'auto' }}>
      <h2>Calculate Expense</h2>
      <TextField
        type="number"
        value={initialAmount}
        onChange={e => setInitialAmount(parseFloat(e.target.value))}
        label="Initial Amount"
      />
      <br />
      <TextField
        value={newExpense.detail}
        onChange={e => setNewExpense({ ...newExpense, detail: e.target.value })}
        label="Expense Detail"
      />
      <TextField
        type="number"
        value={newExpense.amount}
        onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
        label="Expense Amount"
      />
      <Select
        value={newExpense.extype}
        onChange={e => setNewExpense({ ...newExpense, extype: e.target.value })}
      >
        <MenuItem value="Profit">Profit</MenuItem>
        <MenuItem value="Loss">Loss</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={handleAddExpense}>Add Expense</Button>
      <br></br>
      <Select
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Profit">Profit</MenuItem>
        <MenuItem value="Loss">Loss</MenuItem>
      </Select>
      <div style={{ maxHeight: '200px', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Detail</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{expense.detail}</TableCell>
                  <TableCell align="right">{expense.amount}</TableCell>
                  <TableCell align="right">{expense.extype}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <p>Initial Amount: {initialAmount}</p>
      <p>Total Profit: {totalProfit}</p>
      <p>Total Loss: {totalLoss}</p>
      <p>Remaining Amount: {remainingAmount}</p>
      <h2>Goals</h2>
      <TextField
        value={newGoal.product}
        onChange={e => setNewGoal({ ...newGoal, product: e.target.value })}
        label="Product"
      />
      <TextField
        type="number"
        value={newGoal.price}
        onChange={e => setNewGoal({ ...newGoal, price: e.target.value })}
        label="Price"
      />
      <Button variant="contained" color="primary" onClick={handleAddGoal}>Add Goal</Button>
      <div style={{ maxHeight: '200px', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Can Buy?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goals.map((goal, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{goal.product}</TableCell>
                  <TableCell align="right">{goal.price}</TableCell>
                  <TableCell align="right">{goal.price <= remainingAmount ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ExpensePage;
