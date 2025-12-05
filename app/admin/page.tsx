"use client";
import { useState, useEffect } from "react";
import { Button, Pagination, Select, Input } from "antd";
import { useAdminCourseQuery } from "../redux/api/call/courseApi";
import AdminCard from "../components/adminCard";
import Link from "next/link";

const { Option } = Select;

export default function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchQ, setSearchQ] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [localCourses, setLocalCourses] = useState<any[]>([]); // Local state for toggle changes

  // Custom debounce hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(searchQ);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQ]);

  const { data, isLoading } = useAdminCourseQuery({
    page: currentPage,
    limit,
    searchQ: searchDebounced,
    sort: sort as "high" | "low" | "",
    category: category as
      | "Web Development"
      | "Graphic Design & Illustration"
      | "Marketing & Sales"
      | "Communication Skills"
      | "",
  });

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchDebounced, sort, category]);

  // Sync API data with local state when new data arrives
  useEffect(() => {
    if (data?.data) {
      setLocalCourses(
        data.data.map((course: any) => ({
          ...course,
          localStatus: course.status,
        }))
      );
    }
  }, [data?.data]);

  if (isLoading) {
    return (
      <div className="pt-10 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading courses...</div>
      </div>
    );
  }

  const courses = localCourses.length > 0 ? localCourses : data?.data || [];

  const resetFilters = () => {
    setSearchQ("");
    setSort("");
    setCategory("");
    setCurrentPage(1);
    setLocalCourses([]); // Reset local changes
  };

  return (
    <div className="pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Course Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and organize your courses
            </p>
          </div>
          <Link href={"/admin/add-course"}>
            <Button
              size="large"
              type="dashed"
              className="bg-slate-800! hover:bg-slate-900! text-white! border-slate-400! rounded-full"
            >
              + Add New Course
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search course or instructor..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              className="rounded-xl hover:border-gray-500!"
              prefix={<span className="mr-2">🔍</span>}
            />

            <Select
              placeholder="Category"
              value={category}
              onChange={setCategory}
              className="rounded-xl hover:border-gray-500!"
              allowClear
            >
              <Option value="">Select an category</Option>
              <Option value="Web Development">Web Development</Option>
              <Option value="Graphic Design & Illustration">
                Graphic Design & Illustration
              </Option>
              <Option value="Marketing & Sales">Marketing & Sales</Option>
              <Option value="Communication Skills">Communication Skills</Option>
            </Select>

            <Select
              placeholder="Sort by price"
              value={sort}
              onChange={setSort}
              className="rounded-xl hover:border-gray-500!"
              allowClear
            >
              <Option value="">Sort by</Option>
              <Option value="high">Price: High to Low</Option>
              <Option value="low">Price: Low to High</Option>
            </Select>

            <Button
              onClick={resetFilters}
              className="rounded-xl h-11 hover:border-gray-500! hover:text-gray-700!"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course: any) => (
            <AdminCard key={course?._id} course={course} />
          ))}
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No courses found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <Pagination
              current={currentPage}
              total={data?.pagination?.totalData || 0}
              pageSize={limit}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
