"use client";
import { Button, message } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    message.success("Login success!");
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="mt-20 flex items-center justify-center  px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <Button
              htmlType="submit"
              size="large"
              type="primary"
              className="w-full bg-black! text-white  rounded-md hover:bg-gray-700! focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center grid gap-3">
            <Link href="#" className="text-sm text-slate-600 hover:text-slate-700">
              Forgot password?
            </Link>
            <Link
              href="/auth/register"
              className="text-xs hover:underline text-slate-800 hover:text-slate-700"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
