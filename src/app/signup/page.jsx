"use client";
import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { error } = await authClient.signUp.email({
        name,
        image,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      setTimeout(() => router.push("/"), 1200);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>

        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={onSubmit}
        >
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              required
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              required
              name="image"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              required
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              required
              name="password"
              type="password"
              minLength={8}
              className="w-full px-3 py-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md w-full disabled:opacity-60"
            >
              <Check />
              {loading ? "Creating..." : "Submit"}
            </button>

            <button
              type="reset"
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
}