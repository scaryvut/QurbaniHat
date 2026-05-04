"use client";

import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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
        // 🔥 handle existing user case
        if (error.message?.toLowerCase().includes("exist")) {
          toast.error("Account already exists. Redirecting to Sign In...");
          setTimeout(() => router.push("/signIn"), 1500);
        } else {
          toast.error(error.message || "Signup failed");
        }

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

  // ✅ Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      toast.success("Redirecting to Google...");
    } catch (err) {
      toast.error("Google signup failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-xl p-6 sm:p-8 shadow-sm animate__animated animate__backInDown">

        <h1 className="text-center text-2xl font-bold">
          Sign Up
        </h1>

        {/* FORM */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6">

          <input
            name="name"
            required
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            name="image"
            required
            placeholder="Image URL"
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
            name="password"
            type="password"
            minLength={8}
            required
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-60"
          >
            <Check />
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignUp}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        {/* Sign In Redirect */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/signIn"
            className="text-green-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}