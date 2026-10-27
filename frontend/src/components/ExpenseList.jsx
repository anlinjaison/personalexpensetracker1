import React from 'react';
import { Edit2, Trash2, Search, Filter, ArrowUpDown, Inbox } from 'lucide-react';
import { getCategoryMeta, formatCurrency, formatDate } from '../utils/categories';

const ExpenseList = ({
  expenses = [],
  isLoading,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortChange,
  onEditExpense,
  onDeleteRequest
}) => {
  return (
    <div className="glass-panel" id="expense-list-container">
      <div className="panel-header">
        <h2 className="panel-title">
          <span>Expense History</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            ({expenses.length} {expenses.length === 1 ? 'record' : 'records'})
          </span>
        </h2>
      </div>

      {/* Search and Filters Bar */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by title or notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="search-expenses-input"
          />
        </div>

        <div className="filters-group">
          {/* Category Filter */}
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            id="category-filter-select"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food & Dining</option>
            <option value="Travel">Travel & Commute</option>
            <option value="Bills">Bills & Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health & Medical</option>
            <option value="Other">Other</option>
          </select>

          {/* Sort By Filter */}
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            id="sort-by-select"
          >
            <option value="date_desc">Newest Date</option>
            <option value="date_asc">Oldest Date</option>
            <option value="amount_desc">Highest Amount</option>
            <option value="amount_asc">Lowest Amount</option>
            <option value="title_asc">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading expenses...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Inbox size={28} />
          </div>
          <h3>No expenses found</h3>
          <p>
            {searchQuery || categoryFilter !== 'All'
              ? 'Try adjusting your search query or category filter.'
              : 'Add your first expense using the form on the left to start tracking.'}
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => {
                const catMeta = getCategoryMeta(expense.category);
                return (
                  <tr key={expense._id || expense.id} className="expense-row">
                    <td>
                      <div className="item-title-wrap">
                        <span className="item-title">{expense.title}</span>
                        {expense.description && (
                          <span className="item-desc">{expense.description}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span
                        className="category-badge"
                        style={{
                          backgroundColor: catMeta.bg,
                          color: catMeta.color,
                          border: `1px solid ${catMeta.color}30`
                        }}
                      >
                        {catMeta.label || expense.category}
                      </span>
                    </td>
                    <td>
                      <span className="item-date">{formatDate(expense.date)}</span>
                    </td>
                    <td>
                      <span className="item-amount">
                        {formatCurrency(expense.amount)}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="btn-icon-only edit"
                          onClick={() => onEditExpense(expense)}
                          title={`Edit ${expense.title}`}
                          aria-label={`Edit ${expense.title}`}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon-only delete"
                          onClick={() => onDeleteRequest(expense)}
                          title={`Delete ${expense.title}`}
                          aria-label={`Delete ${expense.title}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
