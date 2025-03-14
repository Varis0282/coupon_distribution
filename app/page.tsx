'use client';

import { useState } from 'react';
import { getCookieId } from '@/lib/cookieUtils';
import CouponCard from './components/CouponCard';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState<{ code: string; description: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const claimCoupon = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const cookieId = getCookieId();
      
      const response = await fetch('/api/claim-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookieId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Failed to claim coupon');
        if (data.timeRemaining) {
          setTimeRemaining(data.timeRemaining);
        }
        return;
      }
      
      setCoupon(data.coupon);
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Coupon Distribution System</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get exclusive coupons for your next purchase. Our system ensures fair distribution
            with one coupon per user within a time period.
          </p>
        </header>

        <main className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 mb-12">
          {coupon ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-6">Congratulations!</h2>
              <p className="text-gray-600 mb-6">You&apos;ve successfully claimed a coupon:</p>
              <CouponCard code={coupon.code} description={coupon.description} />
              <button
                onClick={() => setCoupon(null)}
                className="mt-8 px-6 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                Claim Another Later
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Claim Your Coupon</h2>
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                  {error}
                  {timeRemaining && (
                    <p className="mt-2 font-semibold">
                      Please try again in {timeRemaining} minutes.
                    </p>
                  )}
                </div>
              )}
              <p className="text-gray-600 mb-8">
                Click the button below to claim your exclusive coupon. Remember, you can only claim
                one coupon per hour.
              </p>
              <button
                onClick={claimCoupon}
                disabled={loading}
                className={`px-8 py-3 rounded-full font-medium text-white ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                {loading ? 'Processing...' : 'Claim Coupon'}
              </button>
            </div>
          )}
        </main>

        <footer className="text-center text-gray-500 text-sm">
          <p>© 2024 Coupon Distribution System. All rights reserved.</p>
          <p className="mt-2">
            This system uses IP tracking and cookies to prevent abuse and ensure fair distribution.
          </p>
        </footer>
      </div>
    </div>
  );
}
