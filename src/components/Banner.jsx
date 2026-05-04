import Link from 'next/link';
import React from 'react';

const Banner = () => {
    return (
         <div className="bg-[url('/banner.png')] h-[60vh] w-full bg-cover bg-no-repeat bg-center flex items-center rounded-lg shadow-2xl">
      {/* Overlay */}
      <div className="w-full h-full rounded-lg bg-black/50 flex items-center ">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
            QurbaniHat: Your Premium Farm-to-Hassle- Free Marketplace
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl text-gray-200">
            Your trusted partner for high-quality cattle and seamless Eid-ul-Adha preparations.
          </p>

          <div className="flex gap-4">
            <Link href="#">
              <button className="bg-yellow-600 text-white p-3 rounded-full">
                Book Your Animal
              </button>
            </Link>

            <Link href="/pricing">
              <button  variant="outline" className="text-white border p-3 rounded-full">
                Explore Marketplace
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    );
};

export default Banner;