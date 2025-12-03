"use client";
import { Users, BookOpen, Calendar } from "lucide-react";
import { useCourseDetailsQuery } from "../../redux/api/call/courseApi";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const { data } = useCourseDetailsQuery({ id });
  const course = data?.data || {};
const imageBase = process.env.NEXT_PUBLIC_Image_baseURL;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white pt-2">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
              <img
                src={imageBase+course.image}
                alt={course.name}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-red-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                {course.category}
              </span>
            </div>

            {/* Course Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              {course.name}
            </h1>

            {/* Course Meta */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 pb-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <span className="text-sm sm:text-base text-gray-700">
                  {course.totalEnroll} Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <span className="text-sm sm:text-base text-gray-700">
                  {course.totalModule} Modules
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <span className="text-sm sm:text-base text-gray-700">
                  {formatDate(course.createdAt)}
                </span>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                Instructor
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                <p className="text-base sm:text-lg font-semibold text-black mb-1">
                  {course.instructor}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Course Instructor
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                Course Description
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Syllabus */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-4">
                Course Syllabus
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <ul className="space-y-3">
                  {course?.syllabus?.map((item: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-sm sm:text-base shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm sm:text-base text-gray-800">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 mb-8 lg:sticky lg:top-22">
              {/* Price */}
              <div className="mb-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Course Price
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-red-600">
                  ${course.price}
                </p>
              </div>

              {/* Enroll Button */}
              <button className="w-full bg-black cursor-pointer text-white py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors mb-6">
                Enroll Now
              </button>

              {/* Course Includes */}
              <div className="pt-6">
                <h3 className="font-bold text-black mb-4 text-sm sm:text-base">
                  This course includes:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700">
                      {course.totalModule} comprehensive modules
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700">
                      Lifetime access
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700">
                      Real world assignments
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700">
                      Expert instructor support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
