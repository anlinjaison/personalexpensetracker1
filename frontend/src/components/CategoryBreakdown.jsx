import React from 'react';
import { PieChart } from 'lucide-react';
import { getCategoryMeta, formatCurrency } from '../utils/categories';

const CategoryBreakdown = ({ expenses = [] }) => {
  if (!expenses || expenses.length === 0) return null;

  const totalSpent = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // Group by category
  const categoryMap = {};
  expenses.forEach(item => {
    const cat = item.category || 'Other';
    categoryMap[cat] = (categoryMap[cat] || 0) + (Number(item.amount) || 0);
  });

  const categories = Object.keys(categoryMap)
    .map(cat => ({
      name: cat,
      amount: categoryMap[cat],
      percentage: totalSpent > 0 ? Math.round((categoryMap[cat] / totalSpent) * 100) : 0,
      meta: getCategoryMeta(cat)
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="breakdown-card" id="category-breakdown-section">
      <div className="breakdown-header">
        <h3>
          <PieChart size={18} color="var(--primary)" />
          <span>Spending by Category</span>
        </h3>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {categories.length} {categories.length === 1 ? 'category' : 'categories'}
        </span>
      </div>

      <div className="breakdown-list">
        {categories.map((item) => (
          <div key={item.name} className="breakdown-item">
            <div className="breakdown-meta">
              <span style={{ color: item.meta.color }}>{item.meta.label}</span>
              <span>
                {formatCurrency(item.amount)}{' '}
                <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.78rem' }}>
                  ({item.percentage}%)
                </span>
              </span>
            </div>
            <div className="breakdown-bar-bg">
              <div
                className="breakdown-bar-fill"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.meta.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
