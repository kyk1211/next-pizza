import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    tid: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, _id: false }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
