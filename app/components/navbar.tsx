"use client";
import { Button } from "antd";
import { BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../redux/userSlice";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state: any) => state.userSlice.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const imageBase = process.env.NEXT_PUBLIC_Image_baseURL;
  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (e) {
      // ignore
    }
    try {
      localStorage.removeItem("auth");
    } catch (e) {}
    setProfileOpen(false);
    router.push("/auth/login");
  };
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg text-white shadow-red-200 shadow-lg group-hover:bg-red-700 transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Course<span className="text-red-600">Master</span>.
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {["Home", "Why Us", "Courses"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors tracking-wide"
              >
                {item}
              </Link>
            ))}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-full p-1"
                  aria-label="Open profile menu"
                >
                  {user.image ? (
                    <Image
                      width={42}
                      height={42}
                      src={imageBase + user.image}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute min-w-60 right-0 mt-2  bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100 mb-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="pt-1">
                      <Button
                        block
                        type="default"
                        onClick={() => router.push("/dashboard")}
                      >
                        Dashboard
                      </Button>
                      <Button
                        block
                        danger
                        className="mt-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href={"/auth/login"}>
                <Button
                  type="primary"
                  size="large"
                  className="bg-gray-900! hover:bg-gray-800! text-white! border-none! shadow-none rounded-lg px-6 font-medium"
                >
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              type="text"
              icon={<Menu className="h-6 w-6 text-gray-900" />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 space-y-4 shadow-xl">
          <a href="#home" className="block text-lg font-medium text-gray-900">
            Home
          </a>
          <a href="#why-us" className="block text-lg font-medium text-gray-900">
            Why Us
          </a>
          <a
            href="#courses"
            className="block text-lg font-medium text-gray-900"
          >
            Courses
          </a>
          {user ? (
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <img
                    src={imageBase + user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <Button
                block
                type="default"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button block danger className="mt-2" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href={"/auth/login"}>
              <Button
                block
                type="primary"
                size="large"
                className="bg-gray-900! hover:bg-gray-800! border-none! h-12"
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
