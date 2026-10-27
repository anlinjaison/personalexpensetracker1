// API Service for Expense Tracker
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all expenses with optional search, category, and sort filters
 */
export const fetchExpenses = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  const response = await fetch(`${API_BASE}/expenses${queryString}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch expenses (${response.status})`);
  }

  return await response.json();
};

/**
 * Fetch summary metrics from backend
 */
export const fetchExpenseSummary = async () => {
  const response = await fetch(`${API_BASE}/expenses/summary`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch summary metrics');
  }
  return await response.json();
};

/**
 * Create a new expense
 */
export const createExpense = async (expenseData) => {
  const response = await fetch(`${API_BASE}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Failed to create expense (${response.status})`);
  }

  return data;
};

/**
 * Update an existing expense
 */
export const updateExpense = async (id, expenseData) => {
  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Failed to update expense (${response.status})`);
  }

  return data;
};

/**
 * Delete an expense by ID
 */
export const deleteExpense = async (id) => {
  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Failed to delete expense (${response.status})`);
  }

  return data;
};

/**
 * Check backend health
 */
export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch (err) {
    return false;
  }
};
