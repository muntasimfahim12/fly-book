"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconPlane,
} from "@tabler/icons-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("User logged in:", userCredential.user);

      // Redirect to home page
      router.push("/");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
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
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Login to continue your journey ✈️
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

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
                className="w-full bg-transparent outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full bg-transparent outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-green-600" />
              Remember me
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-green-600 font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
