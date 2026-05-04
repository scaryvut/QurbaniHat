"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Banner = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getAnimals = async () => {
        setLoading(true);
  
        const start = Date.now();
  
        const res = await fetch("/data.json");
        const data = await res.json();
  
        const elapsed = Date.now() - start;
        const remaining = 2000 - elapsed;
  
        setTimeout(() => {
          setLoading(false);
        }, remaining > 0 ? remaining : 0);
      };
  
      getAnimals();
    }, []);
     if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader color="#22c55e" />
      </div>
    );
  }

  

  return (
    <div className="relative h-[60vh] w-full rounded-lg overflow-hidden shadow-2xl">

      <img
        src="/banner.png"
        alt="banner"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-white">

          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
            QurbaniHat: Your Premium Farm-to-Hassle-Free Marketplace
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-xl text-gray-200">
            Your trusted partner for high-quality cattle and seamless Eid-ul-Adha preparations.
          </p>

          <div className="flex gap-4">
            <Link href="/all_animals">
              <button className="bg-yellow-600 text-white px-5 py-3 rounded-full hover:bg-yellow-700">
                Book Your Animal
              </button>
            </Link>

            <Link href="/all_animals">
              <button className="border px-5 py-3 rounded-full hover:bg-white hover:text-black transition">
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