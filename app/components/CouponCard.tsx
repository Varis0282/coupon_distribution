import React from 'react';

interface CouponCardProps {
  code: string;
  description: string;
}

const CouponCard: React.FC<CouponCardProps> = ({ code, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 text-blue-800 font-bold py-2 px-4 rounded-full mb-4">
          {code}
        </div>
        <p className="text-gray-700 text-center">{description}</p>
        <div className="mt-4 border-t border-dashed border-gray-300 pt-4 w-full">
          <p className="text-xs text-gray-500 text-center">
            Use this code at checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponCard; 