"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import QurbaniTips from "./QurbaniTips";

const TopAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const getAnimals = async () => {
      const res = await fetch("https://qurbani-hat-bazar.vercel.app/data.json", {
    cache: "no-store",
  });
      const data = await res.json();
      setAnimals(data);
    };

    getAnimals();
  }, []);

  return (
    <div className="px-6 py-10">
      <Marquee className="mb-5 font-bold">
        <QurbaniTips></QurbaniTips>
      </Marquee>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        {animals.slice(0, 4).map((animal) => (
          <div
            key={animal.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={animal.image}
                fill
                alt=""
                className="object-center rounded-xl"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{animal.name}</h2>

              <p className="text-gray-500 text-sm">
                {animal.breed} • {animal.location}
              </p>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Weight: {animal.weight}kg</span>
                <span>Age: {animal.age} yrs</span>
              </div>

              {/* Price */}
              <div className="text-lg font-bold text-green-600">
                ৳ {animal.price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAnimals;
