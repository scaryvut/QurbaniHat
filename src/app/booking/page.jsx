"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const animalId = searchParams.get("animalId");

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch selected animal
  useEffect(() => {
    const fetchAnimal = async () => {
      const res = await fetch("/data.json");
      const data = await res.json();
      const found = data.find((a) => a.id == animalId);
      setAnimal(found);
    };

    if (animalId) fetchAnimal();
  }, [animalId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const bookingData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      animalId,
    };

    try {
      // simulate API
      await new Promise((res) => setTimeout(res, 1000));

      console.log("Booking:", bookingData);

      toast.success("Booking confirmed!");
      form.reset(); // ✅ reset after submit
    } catch {
      toast.error("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-2xl font-bold text-center text-green-600">
          Book Your Animal
        </h2>

        {/* Show selected animal */}
        {animal && (
          <p className="text-center text-gray-500 mt-2">
            Booking: <span className="font-semibold">{animal.name}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            name="name"
            required
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            name="phone"
            required
            placeholder="Phone"
            className="w-full px-3 py-2 border rounded-md"
          />

          <textarea
            name="address"
            required
            placeholder="Address"
            className="w-full px-3 py-2 border rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}