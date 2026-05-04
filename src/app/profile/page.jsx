"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const MyProfile = () => {
  const userData = authClient.useSession();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = mounted ? userData.data?.user : null;

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const { error } = await authClient.updateUser({
        name: form.name,
        email: form.email,
      });

      if (error) {
        toast.error(error.message || "Update failed");
        return;
      }

      toast.success("Profile updated successfully");
      setOpen(false);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const avatar =
    mounted && user?.image && user.image.startsWith("http")
      ? user.image
      : `https://api.dicebear.com/7.x/initials/svg?seed=User`;

  if (!mounted) {
    return <div className="p-10 text-center"><CircleLoader /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <ToastContainer />

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
          <img
            src={avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-semibold">
              {user?.name || "Loading..."}
            </h1>
            <p className="text-gray-500">{user?.email || ""}</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
          >
            Edit Profile
          </button>
        </div>

        {/* Inline Modal Overlay */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>

              {/* Name */}
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-3 py-2 text-sm bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;