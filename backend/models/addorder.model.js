const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addorderSchema = new Schema({
  orderID: {
    type: Number,
    unique: true, // Ensure unique orderID
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true, // Added required to ensure it's provided
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  view: {
    type: String,
  },
  category: {
    type: String,
  },
  status: {
    type: String,
  },
  approval: {
    type: String,
  },
},
{
  timestamps: true,
});

addorderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastOrder = await this.constructor.findOne().sort('-orderID');
    this.orderID = lastOrder ? lastOrder.orderID + 1 : 1;
  }
  next();
});

const Addorder = mongoose.model('Addorder', addorderSchema);

module.exports = Addorder;
