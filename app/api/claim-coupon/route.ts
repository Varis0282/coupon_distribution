import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Coupon from '@/models/Coupon';
import CouponClaim from '@/models/CouponClaim';

// Time restriction in milliseconds (1 hour)
const TIME_RESTRICTION = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the client's IP address
    const ipAddress = req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      '127.0.0.1';
    
    // Get the cookie ID from the request body
    const { cookieId } = await req.json();
    
    if (!cookieId) {
      return NextResponse.json({ error: 'Cookie ID is required' }, { status: 400 });
    }

    // Check if the user has claimed a coupon within the restricted time frame
    const recentClaim = await CouponClaim.findOne({
      $or: [
        { ipAddress },
        { cookieId }
      ],
      claimedAt: { $gt: new Date(Date.now() - TIME_RESTRICTION) }
    });

    if (recentClaim) {
      // Calculate time remaining before the user can claim another coupon
      const timeElapsed = Date.now() - new Date(recentClaim.claimedAt).getTime();
      const timeRemaining = Math.ceil((TIME_RESTRICTION - timeElapsed) / (60 * 1000)); // in minutes
      
      return NextResponse.json({
        error: 'Rate limit exceeded',
        message: `You can claim another coupon in ${timeRemaining} minutes.`,
        timeRemaining
      }, { status: 429 });
    }

    // Find an active coupon that hasn't been claimed by this user
    const coupon = await Coupon.findOne({ isActive: true });

    if (!coupon) {
      return NextResponse.json({ error: 'No coupons available' }, { status: 404 });
    }

    // Create a new coupon claim
    await CouponClaim.create({
      couponId: coupon._id,
      ipAddress,
      cookieId,
    });

    // Return the coupon
    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        description: coupon.description
      }
    });
  } catch (error) {
    console.error('Error claiming coupon:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 