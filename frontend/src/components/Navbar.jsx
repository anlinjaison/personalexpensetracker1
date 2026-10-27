import React from 'react';
import { Wallet, RefreshCw, Server } from 'lucide-react';

const Navbar = ({ isBackendOnline, onRefresh, isRefreshing }) => {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Wallet size={24} />
        </div>
        <div className="brand-text">
          <h1>ExpenseTracker</h1>
          <p className="brand-subtitle">Personal Finance & Daily Expense Management</p>
        </div>
      </div>

      <div className="nav-actions">
        <div className={`connection-badge ${isBackendOnline ? '' : 'offline'}`}>
          <span className="pulse-dot"></span>
          <span>{isBackendOnline ? 'Database Connected' : 'Server Disconnected'}</span>
        </div>

        <button 
          className="btn btn-secondary btn-sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh expense records"
        >
          <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} />
          <span>Refresh</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
