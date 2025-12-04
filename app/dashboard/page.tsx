"use client";

import { useState } from "react";
import {
  Card,
  Pagination,
  Spin,
  Empty,
  Row,
  Col,
  Badge,
  Avatar,
  Tag,
  Select,
} from "antd";
import { useGetMyCoursesQuery } from "../redux/api/call/courseApi";
import Image from "next/image";
import Link from "next/link";

interface EnrolledCourse {
  _id: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  user: string;
  userImage: string;
  instructor: string;
  status: "pending" | "accepted" | "rejected";
  note: string;
}

interface CoursesResponse {
  success: boolean;
  status: number;
  message: string;
  pagination: {
    totalPage: number;
    currentPage: number;
    prevPage: number;
    nextPage: number;
    totalData: number;
  };
  data: EnrolledCourse[];
}

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const { data, isLoading } = useGetMyCoursesQuery({ page, limit, status });

  const courses = data as CoursesResponse;
  const coursesList = courses?.data || [];
  const totalData = courses?.pagination?.totalData || 0;
  const imageBase = process.env.NEXT_PUBLIC_Image_baseURL;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <div className="pt-10 min-h-screen ">
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
            <p className="text-gray-600 mt-1">
              Total Courses:{" "}
              <span className="font-semibold text-green-600">{totalData}</span>
            </p>
          </div>

          <Select
            value={status}
            onChange={setStatus}
            style={{ width: 180 }}
            placeholder="Filter by status"
            options={[
              { label: "All Courses", value: "" },
              { label: "Accepted", value: "accepted" },
              { label: "Pending", value: "pending" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            Loading...
          </div>
        ) : (
          <>
            <Row gutter={[24, 24]} className="mb-8">
              {coursesList.map((course: EnrolledCourse) => (
                <Col key={course._id} xs={24} sm={24} md={12} lg={8} xl={6}>
                  <Link href={`/course/watch/${course?.courseId}`}>
                    <Card
                      hoverable
                      className="h-full border border-gray-50! shadow-sm hover:shadow-md! "
                      cover={
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <Image
                            src={imageBase + course.courseImage}
                            alt={course?.courseName}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/300x200?text=No+Image";
                            }}
                          />
                        </div>
                      }
                    >
                      <div className="space-y-3">
                        <h3 className="font-semibold text-base line-clamp-2">
                          {course.courseName}
                        </h3>

                        <div className="pt-2">
                          <p className="text-xs text-gray-500 mb-1">
                            Instructor
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {course.instructor}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-gray-500">Status</span>
                          <Badge
                            color={getStatusColor(course.status)}
                            text={
                              <span className="capitalize text-xs font-medium">
                                {course.status}
                              </span>
                            }
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>

            {totalData > limit && (
              <div className="flex justify-center pt-6 bg-white rounded-lg p-4">
                <Pagination
                  current={page}
                  total={totalData}
                  pageSize={limit}
                  onChange={(newPage) => setPage(newPage)}
                  showSizeChanger={false}
                  showQuickJumper
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
