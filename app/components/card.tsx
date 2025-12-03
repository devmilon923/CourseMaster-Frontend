"use client";
import { Button } from "antd";
import { ArrowRight, Layers, Tag, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Card({ course }: { course: any }) {
  const imageBase = process.env.NEXT_PUBLIC_Image_baseURL;
  return (
    <div
      key={course._id}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1"
    >
      {/* Image Area */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          width={100}
          height={100}
          src={imageBase + course.image}
          alt={course.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md border border-gray-200 text-xs font-bold text-gray-900 rounded-md shadow-sm uppercase tracking-wider">
            <Tag className="w-3 h-3 text-red-600" />
            {course.category}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col grow">
        {/* Title & Instructor */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
            {course.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            By <span className="text-gray-900">{course.instructor}</span>
          </p>
        </div>

        {/* Metrics Row */}
        <div className="flex items-center gap-5 mb-6 pt-4 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2 text-gray-500">
            <Layers className="h-4 w-4 text-red-500" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              {course.totalModule} Modules
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Users className="h-4 w-4 text-red-500" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              {course.totalEnroll} Enrolled
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">
              Price
            </span>
            <span className="text-xl font-bold text-gray-900">
              ${course?.price}
            </span>
          </div>

          <Link href={`/course/${course._id}`}>
            <Button
              type="text"
              className="text-gray-900 font-semibold hover:text-red-600 hover:bg-red-50 px-4 flex items-center gap-2 group/btn transition-all"
            >
              Details
              <ArrowRight className="h-4 w-4 transform transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
