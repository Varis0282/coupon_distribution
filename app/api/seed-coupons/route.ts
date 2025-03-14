import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Coupon from '@/models/Coupon';

// Sample coupons for seeding
const sampleCoupons = [
  { code: 'SAVE10', description: '10% off your next purchase' },
  { code: 'SAVE20', description: '20% off your next purchase' },
  { code: 'FREESHIP', description: 'Free shipping on your next order' },
  { code: 'BOGO50', description: 'Buy one get one 50% off' },
  { code: 'WELCOME15', description: '15% off for new customers' },
  { code: 'SUMMER25', description: '25% off summer collection' },
  { code: 'FLASH30', description: '30% off flash sale' },
  { code: 'LOYALTY10', description: '10% off for loyalty members' },
  { code: 'HOLIDAY20', description: '20% off holiday items' },
  { code: 'APP15', description: '15% off when ordering through our app' },
];

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Check if coupons already exist
    const existingCoupons = await Coupon.countDocuments();
    
    if (existingCoupons > 0) {
      return NextResponse.json({
        success: false,
        message: 'Coupons already seeded',
        count: existingCoupons
      });
    }

    // Insert sample coupons
    await Coupon.insertMany(sampleCoupons);

    return NextResponse.json({
      success: true,
      message: 'Coupons seeded successfully',
      count: sampleCoupons.length
    });
  } catch (error) {
    console.error('Error seeding coupons:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 