"use client";
import { baseApi } from "@/app/redux/api/baseApi";
import { useAdminLoginMutation } from "@/app/redux/api/call/authApi";
import { setToken, setUser } from "@/app/redux/userSlice";
import { Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, {}] = useAdminLoginMutation();
  const route = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // Handle login logic here
    try {
      const loginUser = await login({ email, password }).unwrap();
      if (loginUser.success) {
        message.success("Admin Login successful!");
        const data = loginUser.data;
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        localStorage.removeItem("auth");
        localStorage.setItem("aauth", data.token || null);

        dispatch(
          baseApi.util.invalidateTags([
            "auth",
            "assignment",
            "course",
            "module",
            "quiz",
            "video",
          ])
        );
        return route.push("/admin");
      }
    } catch (error: any) {
      return message.error(error.data.message || "Unknown error");
    }
  };

  return (
    <div className="mt-20 flex items-center justify-center  px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Admin Login
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
                suppressHydrationWarning
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
            <Link
              href="#"
              className="text-sm text-slate-600 hover:text-slate-700"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
