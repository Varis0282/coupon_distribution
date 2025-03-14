import mongoose, { Schema, Document } from 'mongoose';

// Define the Coupon interface
export interface ICoupon extends Document {
  code: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Coupon schema
const CouponSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create and export the Coupon model
export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema); 