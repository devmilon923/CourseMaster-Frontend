"use client";

import { useLandingStacksQuery } from "../redux/api/call/courseApi";

export default function Stats() {
  const { data, isLoading } = useLandingStacksQuery({});
  if (isLoading) return <>Loading stats</>;
  return (
    <div className="flex gap-12 border-t border-gray-100 pt-8">
      <div>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">
          {data?.data?.totalCourse || 0}
        </p>
        <p className="text-sm text-gray-500 mt-1">Total Courses</p>
      </div>
      <div className="w-px h-12 bg-gray-200"></div>
      <div>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">
          {data?.data?.totalStudents || 0}
        </p>
        <p className="text-sm text-gray-500 mt-1">Total Students</p>
      </div>
    </div>
  );
}
