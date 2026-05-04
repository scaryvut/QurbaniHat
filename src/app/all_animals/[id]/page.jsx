import React from "react";
import Image from "next/image";
import Link from "next/link";

const DetailsAnimals = async ({ params }) => {
  const { id } = await params;
  const res = await fetch("http://localhost:3000/data.json");
  const animals = await res.json();
  const animal = animals.find((a) => a.id == id);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6 flex justify-end">
        <Link href="/all_animals">
          <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
            ← Back
          </button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6">
        {/* Image */}
        <div>
          <Image
            src={animal.image}
            alt={animal.name}
            width={600}
            height={400}
            className="w-full h-[400px] object-cover rounded-xl"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{animal.name}</h1>

          <p className="text-gray-500">
            {animal.breed} • {animal.location}
          </p>

          <div className="text-3xl font-bold text-green-600">
            ৳ {animal.price.toLocaleString()}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-gray-500">Weight</p>
              <p className="font-semibold">{animal.weight} kg</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-gray-500">Age</p>
              <p className="font-semibold">{animal.age} Years</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-gray-500">Type</p>
              <p className="font-semibold">{animal.type}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-gray-500">Category</p>
              <p className="font-semibold">{animal.category}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 mt-6">
<Link href="/booking">
  <button className="flex-1 w-[300px] bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
    Book Now
  </button>
</Link>
            <button className="flex-1 border border-green-500 text-green-600 py-3 rounded-lg">
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-600">{animal.description}</p>
      </div>
    </div>
  );
};

export default DetailsAnimals;
