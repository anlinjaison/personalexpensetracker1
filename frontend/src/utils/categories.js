// Category definitions with color themes and icon names
export const CATEGORIES = [
  { id: 'Food', label: 'Food & Dining', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
  { id: 'Travel', label: 'Travel & Commute', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)' },
  { id: 'Bills', label: 'Bills & Utilities', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  { id: 'Shopping', label: 'Shopping', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
  { id: 'Entertainment', label: 'Entertainment', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' },
  { id: 'Health', label: 'Health & Medical', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  { id: 'Other', label: 'Other', color: '#64748b', bg: 'rgba(100, 116, 139, 0.12)' }
];

export const getCategoryMeta = (categoryId) => {
  const match = CATEGORIES.find(c => c.id === categoryId);
  return match || { id: categoryId || 'Other', label: categoryId || 'Other', color: '#64748b', bg: 'rgba(100, 116, 139, 0.12)' };
};

// Format currency in clean USD or local style
export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// Format date into human-readable string (e.g., "Oct 24, 2026")
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format date for HTML input type="date" (YYYY-MM-DD)
export const toInputDateFormat = (dateString) => {
  if (!dateString) {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    return new Date().toISOString().split('T')[0];
  }
  return d.toISOString().split('T')[0];
};
