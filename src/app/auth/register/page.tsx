"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconUser,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconPlane,
} from "@tabler/icons-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/config"; // Firebase auth
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create user with email & password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Update displayName with full name
      await updateProfile(userCredential.user, { displayName: name });

      // ✅ Console log for success
      console.log("User registered successfully:", userCredential.user);

      // 3️⃣ Redirect to Login page (direct login হবে না)
      alert("Registration successful! Please login to continue.");
      router.push("/auth/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Error handling
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please try login.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert("Registration failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border p-8"
      >
        {/* LOGO */}
        <div className="flex justify-center items-center gap-2 mb-6 text-xl font-semibold">
          <IconPlane className="text-green-600" />
          <span>FlyBook</span>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Start your journey with us ✈️
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Full Name
            </label>
            <div className="flex items-center gap-2 rounded-xl border px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
              <IconUser size={18} className="text-gray-400" />
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Email Address
            </label>
            <div className="flex items-center gap-2 rounded-xl border px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
              <IconMail size={18} className="text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
              <IconLock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>
          </div>

          {/* TERMS */}
          <div className="flex items-center text-xs text-gray-600 gap-2">
            <input type="checkbox" className="accent-green-600" required />
            <span>
              I agree to the{" "}
              <Link href="#" className="text-green-600 hover:underline">
                Terms & Conditions
              </Link>
            </span>
          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 transition disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
