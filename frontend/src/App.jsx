import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryBreakdown from './components/CategoryBreakdown';
import DeleteModal from './components/DeleteModal';
import Toast from './components/Toast';
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  checkBackendHealth
} from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  // Filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');

  // Modal / Editing states
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load all expenses from backend
  const loadExpenses = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    try {
      const data = await fetchExpenses({
        search: searchQuery,
        category: categoryFilter,
        sortBy: sortBy
      });

      if (data && data.success) {
        setExpenses(data.data || []);
        setTotalAmount(data.totalAmount !== undefined ? data.totalAmount : 0);
        setIsBackendOnline(true);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setIsBackendOnline(false);
      if (isManualRefresh) {
        addToast(`Could not connect to backend server: ${error.message}`, 'error');
      }
    } finally {
      setIsLoading(false);
      if (isManualRefresh) setIsRefreshing(false);
    }
  }, [searchQuery, categoryFilter, sortBy]);

  // Initial load and filter change trigger
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  // Periodically verify backend connection
  useEffect(() => {
    const checkStatus = async () => {
      const online = await checkBackendHealth();
      setIsBackendOnline(online);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  // Handle Create or Update Expense
  const handleFormSubmit = async (formData, onSuccessCallback) => {
    setIsSubmitting(true);
    try {
      if (editingExpense) {
        // Update existing expense
        const id = editingExpense._id || editingExpense.id;
        const result = await updateExpense(id, formData);
        
        addToast(result.message || 'Expense updated successfully!', 'success');
        setEditingExpense(null);
      } else {
        // Create new expense
        const result = await createExpense(formData);
        addToast(result.message || 'Expense added successfully!', 'success');
      }

      // Reset form if callback provided
      if (onSuccessCallback) onSuccessCallback();

      // Refresh list and summary automatically without page reload
      await loadExpenses();
    } catch (error) {
      console.error('Save failed:', error);
      addToast(error.message || 'Failed to save expense. Please check your connection and inputs.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Expense
  const handleConfirmDelete = async () => {
    if (!deletingExpense) return;
    setIsDeleting(true);
    try {
      const id = deletingExpense._id || deletingExpense.id;
      const result = await deleteExpense(id);

      addToast(result.message || 'Expense removed successfully!', 'success');
      setDeletingExpense(null);

      // Refresh list and summary automatically without page reload
      await loadExpenses();
    } catch (error) {
      console.error('Delete failed:', error);
      addToast(error.message || 'Failed to delete expense. Please try again.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar
        isBackendOnline={isBackendOnline}
        onRefresh={() => loadExpenses(true)}
        isRefreshing={isRefreshing}
      />

      {/* Summary Cards with Total Amount Spent at Top */}
      <SummaryCards
        totalAmount={totalAmount}
        expenses={expenses}
      />

      {/* Main Grid: Form on Left, Table/List on Right */}
      <main className="main-layout">
        <aside>
          <ExpenseForm
            editingExpense={editingExpense}
            onSubmit={handleFormSubmit}
            onCancelEdit={() => setEditingExpense(null)}
            isSubmitting={isSubmitting}
          />

          {/* Visual Spending Breakdown by Category */}
          <CategoryBreakdown expenses={expenses} />
        </aside>

        <section>
          <ExpenseList
            expenses={expenses}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onEditExpense={(expense) => {
              setEditingExpense(expense);
              // Smooth scroll to form on mobile
              const formEl = document.getElementById('expense-form-container');
              if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
            }}
            onDeleteRequest={(expense) => setDeletingExpense(expense)}
          />
        </section>
      </main>

      {/* Confirmation Dialog for Deletion */}
      <DeleteModal
        isOpen={Boolean(deletingExpense)}
        expense={deletingExpense}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingExpense(null)}
        isDeleting={isDeleting}
      />

      {/* Toast Alerts for Success & Error Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
