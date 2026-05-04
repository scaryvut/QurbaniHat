"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      toast.success("Signed out successfully");
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      toast.error("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-b px-4">
      <nav className="flex flex-wrap md:flex-nowrap justify-between items-center py-3 max-w-7xl mx-auto w-full gap-3">

        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={45}
            height={45}
            className="object-cover"
          />
          <h3 className="font-black text-xl md:text-2xl">
            QurbaniHat
          </h3>
        </div>

        {/* Links */}
        <ul className="flex gap-4 md:gap-6 text-sm flex-wrap justify-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/all_animals">All Animals</Link></li>
          <li><Link href="/profile">My Profile</Link></li>
        </ul>

        {/* Auth Section */}
        <div className="flex items-center gap-3">

          {!user && (
            <ul className="flex items-center gap-3 text-sm">
              <li><Link href="/signup">SignUp</Link></li>
              <li><Link href="/signIn">SignIn</Link></li>
            </ul>
          )}

          {user && (
            <div className="flex items-center gap-3 text-sm">

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-green-600 flex items-center justify-center text-white font-semibold">
                {user?.image ? (
                  <Image
                    src={'/logo.png'}
                    alt="user"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              {/* Sign out */}
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-60"
              >
                {loading ? "Signing out..." : "Sign Out"}
              </button>

            </div>
          )}

        </div>
      </nav>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Navbar;