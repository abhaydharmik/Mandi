import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  document.title = "Mandi | Profile";

  const { getUser, updateProfile, loading } = useAuth();
  const storedUser = getUser();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    password: storedUser?.password || "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    updateProfile(formData, () => {
      toast.success("Profile updated");
      setIsEditing(false);
    });
  };

  const cancelEdit = () => {
    setFormData({ name: storedUser?.name, email: storedUser?.email, password: storedUser?.password });
    setIsEditing(false);
  };

  const inputClass = (editable) =>
    `w-full px-4 py-2.5 rounded-lg text-sm border transition-colors duration-150 outline-none ${
      editable
        ? "bg-white dark:bg-neutral-800 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:border-orange-500/70 dark:focus:border-orange-500/50"
        : "bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-white/[0.04] text-gray-500 dark:text-neutral-400 cursor-not-allowed"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="mb-8 sm:mb-12">
          <p className="text-orange-500 text-xs tracking-[0.2em] uppercase font-medium mb-2 sm:mb-3">Account</p>
          <h1 className="text-gray-900 dark:text-white text-2xl sm:text-4xl font-bold tracking-tight mb-2">My Profile</h1>
          <p className="text-gray-500 dark:text-neutral-500 text-sm">Manage your personal information</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl p-5 sm:p-7 flex flex-row lg:flex-col items-center lg:text-center gap-5 lg:gap-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center shrink-0 lg:mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-orange-500 dark:text-orange-400">{storedUser?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 lg:w-full">
              <p className="text-gray-900 dark:text-white font-semibold mb-0.5 lg:mb-1">{storedUser?.name}</p>
              <p className="text-gray-500 dark:text-neutral-500 text-xs mb-0 lg:mb-6 truncate max-w-full">{storedUser?.email}</p>
              <div className="hidden lg:block w-full border-t border-gray-100 dark:border-white/6 pt-5 space-y-3">
                {[
                  { label: "Account ID", value: storedUser?.id || "1001", mono: true },
                  { label: "Status", value: "Active", green: true },
                  { label: "Member since", value: new Date().toLocaleDateString() },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-gray-400 dark:text-neutral-500">{row.label}</span>
                    <span className={`${row.green ? "text-emerald-500 dark:text-emerald-400 font-medium" : "text-gray-700 dark:text-neutral-300"} ${row.mono ? "font-mono" : ""}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl px-5 py-4 grid grid-cols-3 gap-4">
            {[
              { label: "ID", value: storedUser?.id || "1001", mono: true },
              { label: "Status", value: "Active", green: true },
              { label: "Since", value: new Date().toLocaleDateString() },
            ].map((row) => (
              <div key={row.label} className="text-center">
                <p className="text-gray-400 dark:text-neutral-500 text-[10px] uppercase tracking-wider mb-1">{row.label}</p>
                <p className={`text-xs font-medium ${row.green ? "text-emerald-500 dark:text-emerald-400" : "text-gray-700 dark:text-neutral-300"} ${row.mono ? "font-mono" : ""}`}>{row.value}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl p-5 sm:p-7">
            <div className="flex items-center justify-between mb-5 sm:mb-7">
              <h2 className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">Account Details</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all duration-150">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Edit
                </button>
              )}
            </div>
            <div className="space-y-4 sm:space-y-5">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">{f.label}</label>
                  <input type={f.type} name={f.name} value={formData[f.name]} disabled={!isEditing} onChange={handleChange} className={inputClass(isEditing)} />
                </div>
              ))}
              {isEditing && (
                <div>
                  <label className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">New Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass(true)} placeholder="Enter new password" />
                </div>
              )}
              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} disabled={loading} className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-orange-500 hover:bg-orange-400 text-white transition-colors duration-150 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button onClick={cancelEdit} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-white/10 text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all duration-150">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;