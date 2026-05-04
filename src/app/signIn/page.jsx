"use client";

import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign in failed");
        setLoading(false);
        return;
      }

      toast.success("Signed in successfully");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      toast.success("Redirecting to Google...");
    } catch (err) {
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate__animated animate__backInDown">
      <div className="w-full max-w-md border rounded-xl shadow-sm p-6 sm:p-8">

        <h1 className="text-center text-2xl font-bold">
          Sign In
        </h1>

        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={onSubmit}
        >
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            <Check />
            {loading ? "Signing in..." : "Sign In"}
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
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
  Don’t have an account?{" "}
  <a
    href="/signup"
    className="text-green-600 font-medium hover:underline"
  >
    Sign Up
  </a>
</p>
      </div>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}