import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, X, DollarSign, Calendar, Tag, FileText, Check } from 'lucide-react';
import { CATEGORIES, toInputDateFormat } from '../utils/categories';

const initialFormState = {
  title: '',
  amount: '',
  category: 'Food',
  date: toInputDateFormat(new Date()),
  description: ''
};

const ExpenseForm = ({ editingExpense, onSubmit, onCancelEdit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // When editingExpense changes, pre-fill form
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title || '',
        amount: editingExpense.amount !== undefined ? editingExpense.amount : '',
        category: editingExpense.category || 'Food',
        date: toInputDateFormat(editingExpense.date),
        description: editingExpense.description || ''
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [editingExpense]);

  const validate = () => {
    const newErrors = {};

    // Validate title
    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }

    // Validate amount
    if (formData.amount === '' || formData.amount === null || formData.amount === undefined) {
      newErrors.amount = 'Amount is required';
    } else {
      const numAmount = Number(formData.amount);
      if (isNaN(numAmount)) {
        newErrors.amount = 'Amount must be a valid number';
      } else if (numAmount <= 0) {
        newErrors.amount = 'Amount must be greater than zero (no negative amounts)';
      }
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Validate date
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const parsed = new Date(formData.date);
      if (isNaN(parsed.getTime())) {
        newErrors.date = 'Please enter a valid date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const payload = {
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description.trim()
    };

    onSubmit(payload, () => {
      // Callback to reset form on success if not editing
      if (!editingExpense) {
        setFormData(initialFormState);
      }
    });
  };

  const isEditing = Boolean(editingExpense);

  return (
    <div className="glass-panel" id="expense-form-container">
      <div className="panel-header">
        <h2 className="panel-title">
          {isEditing ? (
            <>
              <Edit3 size={20} className="panel-title-icon" />
              <span>Edit Expense</span>
            </>
          ) : (
            <>
              <PlusCircle size={20} className="panel-title-icon" />
              <span>Add Expense</span>
            </>
          )}
        </h2>

        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCancelEdit}
            title="Cancel editing and switch to add new"
          >
            <X size={14} />
            <span>Cancel</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="expense-form" noValidate>
        {/* Title Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="expense-title">
            <span>Title <span className="required-star">*</span></span>
          </label>
          <div className="input-wrapper">
            <input
              id="expense-title"
              name="title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g., Grocery Shopping, Flight Ticket"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="off"
            />
          </div>
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        {/* Amount Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="expense-amount">
            <span>Amount ($) <span className="required-star">*</span></span>
          </label>
          <div className="input-wrapper">
            <DollarSign size={16} className="input-icon" />
            <input
              id="expense-amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              className={`form-input has-icon ${errors.amount ? 'input-error' : ''}`}
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          {errors.amount && <span className="form-error">{errors.amount}</span>}
        </div>

        {/* Category Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="expense-category">
            <span>Category <span className="required-star">*</span></span>
          </label>
          <div className="input-wrapper">
            <Tag size={16} className="input-icon" />
            <select
              id="expense-category"
              name="category"
              className={`form-select has-icon ${errors.category ? 'input-error' : ''}`}
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>

        {/* Date Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="expense-date">
            <span>Date <span className="required-star">*</span></span>
          </label>
          <div className="input-wrapper">
            <Calendar size={16} className="input-icon" />
            <input
              id="expense-date"
              name="date"
              type="date"
              className={`form-input has-icon ${errors.date ? 'input-error' : ''}`}
              value={formData.date}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          {errors.date && <span className="form-error">{errors.date}</span>}
        </div>

        {/* Optional Description / Notes */}
        <div className="form-group">
          <label className="form-label" htmlFor="expense-description">
            <span>Notes (Optional)</span>
          </label>
          <div className="input-wrapper">
            <FileText size={16} className="input-icon" style={{ top: '14px', transform: 'none' }} />
            <textarea
              id="expense-description"
              name="description"
              rows="2"
              className="form-textarea has-icon"
              placeholder="Add optional remarks or vendor details..."
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isSubmitting}
            id="expense-submit-btn"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : isEditing ? (
              <>
                <Check size={16} />
                <span>Update Expense</span>
              </>
            ) : (
              <>
                <PlusCircle size={16} />
                <span>Save Expense</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
