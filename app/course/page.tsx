"use client";

import { useState, useEffect } from "react";
import { Input, Pagination, Select, Spin, Empty } from "antd";
import { Search, Filter, X } from "lucide-react";
import { useGuestCoursesQuery } from "../redux/api/call/courseApi";
import Card from "../components/card";
import { useSearchParams, useRouter } from "next/navigation";

const CATEGORIES = [
  "Web Development",
  "Graphic Design & Illustration",
  "Marketing & Sales",
  "Communication Skills",
];

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
];

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State management
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [limit, setLimit] = useState(10);
  const [searchQ, setSearchQ] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [localSearch, setLocalSearch] = useState(searchQ);

  const { data, isLoading } = useGuestCoursesQuery({
    page,
    limit,
    searchQ,
    category: category as "Web Development" | "Graphic Design & Illustration" | "Marketing & Sales" | "Communication Skills" | "",
    sort: sort as "high" | "low" | "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (searchQ) params.set("search", searchQ);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);

    const queryString = params.toString();
    const newUrl = `/course${queryString ? "?" + queryString : ""}`;
    router.push(newUrl);
  }, [page, searchQ, category, sort, router]);

  const handleSearch = () => {
    setPage(1);
    setSearchQ(localSearch);
  };

  const handleCategoryChange = (value: string) => {
    setPage(1);
    setCategory(value);
  };

  const handleSortChange = (value: string) => {
    setPage(1);
    setSort(value);
  };

  const handleResetFilters = () => {
    setPage(1);
    setSearchQ("");
    setLocalSearch("");
    setCategory("");
    setSort("");
    router.push("/course");
  };

  const courses = data?.data || [];
  const totalCourses = data?.pagination?.totalData || 0;

  return (
    <div className="min-h-screen  to-white py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Explore Courses
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {totalCourses} courses available
          </p>
        </div>

        {/* Compact Filters Section */}
        <div className=" rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 mb-6 shadow-sm border border-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3">
            <div className="sm:col-span-2 lg:col-span-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Course name or topic..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onPressEnter={handleSearch}
                  className="pl-9 h-9 text-sm hover:border-gray-300! "
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Category
              </label>
              <Select
                allowClear
                placeholder="All"
                value={category || undefined}
                onChange={handleCategoryChange}
                options={CATEGORIES.map((cat) => ({
                  label: cat,
                  value: cat,
                }))}
                className="w-full [&_.ant-select-selector]:h-9! [&_.ant-select-selector]:text-sm! hover:border-gray-300!"
              />
            </div>

            {/* Sort Filter */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Sort
              </label>
              <Select
                allowClear
                placeholder="Default"
                value={sort || undefined}
                onChange={handleSortChange}
                options={SORT_OPTIONS}
                className="w-full [&_.ant-select-selector]:h-9! [&_.ant-select-selector]:text-sm! hover:border-gray-300!"
              />
            </div>

            {/* Action Buttons */}
            <div className="sm:col-span-2 lg:col-span-2 flex gap-2 lg:items-end lg:pb-0.5">
              <button
                onClick={handleSearch}
                className="flex-1 lg:flex-none lg:w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm h-9 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Search</span>
              </button>

              {(searchQ || category || sort) && (
                <button
                  onClick={handleResetFilters}
                  className="lg:hidden border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors text-sm h-9 flex items-center justify-center"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Chips */}
          {(searchQ || category || sort) && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-medium text-gray-500">
                Filters:
              </span>
              {searchQ && (
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  {searchQ}
                </span>
              )}
              {category && (
                <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  {category}
                </span>
              )}
              {sort && (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  {sort === "high" ? "High → Low" : "Low → High"}
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="ml-auto text-xs font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16 sm:py-20">
            <Spin size="large" />
          </div>
        ) : courses.length === 0 ? (
          <div className="py-16 sm:py-20">
            <Empty
              description={
                <span className="text-sm text-gray-500">No courses found</span>
              }
            />
          </div>
        ) : (
          <>
            {/* Courses Grid - More compact spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8">
              {courses.map((course: any) => (
                <Card key={course._id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            {totalCourses > limit && (
              <div className="flex justify-center pb-4">
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={totalCourses}
                  onChange={(newPage) => setPage(newPage)}
                  showSizeChanger={false}
                  responsive
                  size="small"
                  className="[&_.ant-pagination-item]:border-gray-200 [&_.ant-pagination-item-active]:border-red-600 [&_.ant-pagination-item-active]:bg-red-50 [&_.ant-pagination-item-active_a]:text-red-600"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
