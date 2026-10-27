import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/categories';

const DeleteModal = ({ isOpen, expense, onConfirm, onCancel, isDeleting }) => {
  if (!isOpen || !expense) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="modal-icon-danger">
          <AlertTriangle size={24} />
        </div>

        <h3 className="modal-title" id="delete-dialog-title">Delete Expense?</h3>
        
        <p className="modal-description">
          Are you sure you want to delete this expense record? This action will remove it permanently from the database.
        </p>

        <div className="modal-expense-preview">
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{expense.title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {expense.category} • {formatDate(expense.date)}
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-rose)' }}>
            {formatCurrency(expense.amount)}
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
            id="confirm-delete-btn"
          >
            {isDeleting ? (
              <span>Deleting...</span>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Confirm Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
