"use client"
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ClimbingBoxLoader } from 'react-spinners';

const AllAnimalPage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  useEffect(() => {
    const getAnimals = async () => {
      setLoading(true);

      const start = Date.now();

      const res = await fetch("/data.json");
      const data = await res.json();

      const elapsed = Date.now() - start;
      const remaining = 2000 - elapsed;

      setTimeout(() => {
        setAnimals(data);
        setLoading(false);
      }, remaining > 0 ? remaining : 0);
    };

    getAnimals();
  }, []);

  // 🔥 derived sorted data (best practice)
  const sortedAnimals = useMemo(() => {
    const sorted = [...animals];

    sorted.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return sorted;
  }, [animals, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader color="#22c55e" />
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">All Animals</h1>

        {/* Sorting Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-4 py-2 rounded ${
              sortOrder === "asc"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Price Low to High
          </button>

          <button
            onClick={() => setSortOrder("desc")}
            className={`px-4 py-2 rounded ${
              sortOrder === "desc"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Price High to Low
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-6 animate__animated animate__backInUp">
        {sortedAnimals.map((animal) => (
          <div
            key={animal.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={animal.image}
                fill
                alt={animal.name}
                className="object-center rounded-xl"
                unoptimized
              />
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{animal.name}</h2>

              <p className="text-gray-500 text-sm">
                {animal.breed} • {animal.location}
              </p>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Weight: {animal.weight}kg</span>
                <span>Age: {animal.age} yrs</span>
              </div>

              <div className="text-lg font-bold text-green-600">
                ৳ {animal.price.toLocaleString()}
              </div>

              <Link href={`/all_animals/${animal.id}`}>
                <button className="w-full mt-3 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAnimalPage;