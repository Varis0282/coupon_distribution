import mongoose, { Schema, Document } from 'mongoose';

// Define the CouponClaim interface
export interface ICouponClaim extends Document {
  couponId: mongoose.Types.ObjectId;
  ipAddress: string;
  cookieId: string;
  claimedAt: Date;
}

// Define the CouponClaim schema
const CouponClaimSchema: Schema = new Schema({
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  ipAddress: { type: String, required: true },
  cookieId: { type: String, required: true },
  claimedAt: { type: Date, default: Date.now },
});

// Create and export the CouponClaim model
export default mongoose.models.CouponClaim || mongoose.model<ICouponClaim>('CouponClaim', CouponClaimSchema); 