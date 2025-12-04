import { Button } from "antd";
import {
  BookOpen,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Layers,
  CheckCircle,
  Play,
  Tag,
} from "lucide-react";
import Card from "./components/card";
import CardSection from "./components/cardSection";
import Link from "next/link";
import Stats from "./components/stats";

export default function Home() {
  // API Response Data for Courses Section

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-red-100 selection:text-red-900">
      {/* Hero Section */}
      <section
        id="home"
        className="pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                New Courses Added
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Elevate your <br />
                <span className="relative inline-block">
                  career path
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-red-200 -z-10"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg font-light">
                Join an elite community of learners. Master industry-standard
                tools with curriculums designed by Fortune 500 experts.
              </p>

              <div className="flex items-center sm:flex-row md:gap-4 gap-2 mb-16">
                <Link href={"/course"}>
                  <Button
                    type="primary"
                    size="large"
                    className="h-14 px-8 text-sm! md:text-base bg-gray-900! hover:bg-gray-800! border-none! rounded-lg shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    Explore Courses
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 h-14 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-4 w-4 text-red-600 fill-current" />
                  </div>
                  <span className="font-medium text-sm text-gray-900">
                    Watch Demo
                  </span>
                </div>
              </div>

              {/* Stats */}
              <Stats />
            </div>

            {/* Right Image */}
            <div className="relative hidden md:block">
              {/* Minimal Geometric Decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
              <div className="absolute bottom-0 left-10 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=900&fit=crop&q=80"
                alt="Students learning together"
                className="relative rounded-2xl shadow-2xl z-10 object-cover h-[600px] w-full"
                style={{ boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)" }}
              />

              {/* Floating Glass Card */}
              <div className="absolute bottom-8 -left-5 z-20 bg-white/80 backdrop-blur-md p-5 rounded-lg shadow-lg border border-white/50 flex items-center gap-4 animate-float">
                <div className="bg-red-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Status
                  </p>
                  <p className="font-bold text-gray-900">
                    Certified Professional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Designed for Excellence
              </h2>
              <p className="text-gray-500 text-lg font-light">
                We prioritize quality over quantity. Every feature is crafted to
                enhance your professional journey.
              </p>
            </div>
            <Button
              type="link"
              className="text-red-600! hover:text-red-700 p-0 font-medium flex items-center gap-2"
            >
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "World-Class Mentors",
                desc: "Learn directly from leaders at top tech firms.",
              },
              {
                icon: TrendingUp,
                title: "Career Acceleration",
                desc: "Strategically designed paths to fast-track promotion.",
              },
              {
                icon: Users,
                title: "Executive Network",
                desc: "Access a private community of ambitious peers.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                  <feature.icon className="h-6 w-6 text-gray-700 group-hover:text-red-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Curated for Success
            </h2>
            <p className="text-gray-500">
              Selection of our most impactful programs
            </p>
          </div>

          <CardSection limit={3} />

          <div className="text-center mt-16">
            <Link href={"/course"}>
              <Button
                size="large"
                className="px-8 h-12 border-gray-300 text-gray-600 hover:text-gray-900! hover:border-gray-900! transition-all"
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-20 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="bg-white/10 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold tracking-tight">
                  CourseMaster.
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering the next generation of leaders through accessible,
                high-quality education.
              </p>
            </div>

            {/* Footer Links */}
            {[
              { header: "Platform", links: ["Browse", "Mentors", "Pricing"] },
              { header: "Company", links: ["About", "Careers", "Legal"] },
              {
                header: "Connect",
                links: ["Twitter", "LinkedIn", "Instagram"],
              },
            ].map((column, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                  {column.header}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-red-500 transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-xs">
              © 2025 CourseMaster Inc. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="text-gray-600 text-xs cursor-pointer hover:text-white">
                Privacy
              </span>
              <span className="text-gray-600 text-xs cursor-pointer hover:text-white">
                Terms
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
