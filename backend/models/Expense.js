const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an expense title'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an expense amount'],
      min: [0.01, 'Amount must be greater than zero']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: {
        values: ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Other'],
        message: '{VALUE} is not a valid category'
      },
      default: 'Other'
    },
    date: {
      type: Date,
      required: [true, 'Please provide a valid date'],
      default: Date.now
    },
    description: {
      type: String,
      trim: true,
      maxlength: [250, 'Description cannot exceed 250 characters'],
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Virtual or helper for clean JSON output
expenseSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
