import React from 'react';
import { DollarSign, Layers, TrendingUp, PieChart } from 'lucide-react';
import { formatCurrency } from '../utils/categories';

const SummaryCards = ({ totalAmount, expenses = [], summaryData = null }) => {
  // Compute metrics
  const count = expenses.length;
  
  // Find highest expense
  const highestExpense = expenses.length > 0 
    ? expenses.reduce((max, curr) => (Number(curr.amount) > Number(max.amount) ? curr : max), expenses[0])
    : null;

  // Find top spending category
  const categoryTotals = expenses.reduce((acc, curr) => {
    const cat = curr.category || 'Other';
    acc[cat] = (acc[cat] || 0) + (Number(curr.amount) || 0);
    return acc;
  }, {});

  let topCategory = 'None';
  let topCategoryAmount = 0;
  for (const [cat, amt] of Object.entries(categoryTotals)) {
    if (amt > topCategoryAmount) {
      topCategory = cat;
      topCategoryAmount = amt;
    }
  }

  return (
    <section className="summary-grid" aria-label="Expenses summary metrics">
      {/* Total Amount Spent Highlight Card */}
      <div className="summary-card highlight" id="summary-total-spent">
        <div className="card-header">
          <span className="card-title">Total Amount Spent</span>
          <div className="card-icon">
            <DollarSign size={20} />
          </div>
        </div>
        <div className="card-value highlight-text">
          {formatCurrency(totalAmount)}
        </div>
        <div className="card-subtitle">
          Real-time aggregated spending across all records
        </div>
      </div>

      {/* Total Records Count */}
      <div className="summary-card" id="summary-total-count">
        <div className="card-header">
          <span className="card-title">Total Expenses</span>
          <div className="card-icon">
            <Layers size={20} />
          </div>
        </div>
        <div className="card-value">
          {count}
        </div>
        <div className="card-subtitle">
          Recorded transactions
        </div>
      </div>

      {/* Highest Single Expense */}
      <div className="summary-card" id="summary-highest-expense">
        <div className="card-header">
          <span className="card-title">Highest Expense</span>
          <div className="card-icon">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="card-value">
          {highestExpense ? formatCurrency(highestExpense.amount) : '$0.00'}
        </div>
        <div className="card-subtitle">
          {highestExpense ? highestExpense.title : 'No expenses logged'}
        </div>
      </div>

      {/* Top Category */}
      <div className="summary-card" id="summary-top-category">
        <div className="card-header">
          <span className="card-title">Top Category</span>
          <div className="card-icon">
            <PieChart size={20} />
          </div>
        </div>
        <div className="card-value" style={{ fontSize: '1.5rem', marginTop: '6px' }}>
          {topCategory}
        </div>
        <div className="card-subtitle">
          {topCategoryAmount > 0 ? formatCurrency(topCategoryAmount) : 'No data yet'}
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
