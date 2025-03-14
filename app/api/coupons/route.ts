import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Coupon from '@/models/Coupon';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get all active coupons
    const coupons = await Coupon.find({ isActive: true });

    return NextResponse.json({
      success: true,
      coupons: coupons.map(coupon => ({
        id: coupon._id,
        code: coupon.code,
        description: coupon.description
      }))
    });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 