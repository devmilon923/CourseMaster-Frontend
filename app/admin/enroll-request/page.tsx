"use client";

import React, { useState } from "react";
import {
  Card,
  Avatar,
  Select,
  Tag,
  Button,
  Pagination,
  message,
  Space,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  useEnrollRequestQuery,
  useUpdateEnrollStatusMutation,
} from "@/app/redux/api/call/courseApi";
import Image from "next/image";

const { Option } = Select;

type EnrollItem = {
  _id: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  user: string;
  userImage: string;
  status: "pending" | "accepted" | "rejected";
  note: string;
};

export default function Page() {
  const [updateEnrollStatus, { isLoading: mutationLoading }] =
    useUpdateEnrollStatusMutation();
  const [statusFilter, setStatusFilter] = useState<
    "pending" | "accepted" | "rejected"
  >("pending");
  const [page, setPage] = useState(1);
  const imageBase = process.env.NEXT_PUBLIC_Image_baseURL;
  const { data, isLoading } = useEnrollRequestQuery({
    status: statusFilter,
    page,
  });

  const items: EnrollItem[] = data?.data || [];
  const pagination = data?.pagination || {
    totalPage: 1,
    currentPage: 1,
    totalData: 0,
  };

  const handleChangeStatus = async (
    item: EnrollItem,
    newStatus: "accepted" | "rejected"
  ) => {
    try {
      // TODO: call your mutation here, e.g.
      await updateEnrollStatus({ id: item?._id, status: newStatus });
      message.success(`Request ${newStatus}`);
    } catch {
      message.error("Failed to update status");
    }
  };

  const renderStatusTag = (status: EnrollItem["status"]) => {
    if (status === "accepted") return <Tag color="green">Accepted</Tag>;
    if (status === "rejected") return <Tag color="red">Rejected</Tag>;
    return <Tag color="gold">Pending</Tag>;
  };

  return (
    <div className=" pt-10">
      <div className="max-w-5xl mx-auto">
        {/* Header + filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Enrollment Requests
            </h1>
            <p className="text-sm text-gray-500">
              Review and manage course enrollment requests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <Select
              size="middle"
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value as any);
                setPage(1);
              }}
              className="min-w-[150px]"
            >
              <Option value="pending">Pending</Option>
              <Option value="accepted">Accepted</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </div>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No requests found for this status.
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <Card
                key={item._id}
                className="shadow-sm border border-gray-100 rounded-xl"
                styles={{ body: { padding: 16 } }}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Course image */}
                  <div className="w-full md:w-40">
                    <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-gray-100">
                      {/* Adapt to your image hosting / next-image if you want */}
                      <Image
                        width={100}
                        height={100}
                        src={imageBase + item.courseImage}
                        alt={item.courseName || "Course thumbnail"}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-3">
                    {/* Top row: course + status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                          {item.courseName}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.note || "No note from student."}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStatusTag(item.status)}
                      </div>
                    </div>

                    {/* User info */}
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={item.userImage}
                        icon={<UserOutlined />}
                        size={40}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.user}
                        </p>
                        <p className="text-xs text-gray-500">
                          Requested to join
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {item.status === "pending" && (
                        <Space>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => handleChangeStatus(item, "accepted")}
                          >
                            Accept
                          </Button>
                          <Button
                            danger
                            size="small"
                            onClick={() => handleChangeStatus(item, "rejected")}
                          >
                            Reject
                          </Button>
                        </Space>
                      )}
                      {item.status === "accepted" && (
                        <Button
                          danger
                          size="small"
                          onClick={() => handleChangeStatus(item, "rejected")}
                        >
                          Mark as Rejected
                        </Button>
                      )}
                      {item.status === "rejected" && (
                        <Button
                          size="small"
                          type="default"
                          onClick={() => handleChangeStatus(item, "accepted")}
                        >
                          Mark as Accepted
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalData > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              current={pagination.currentPage || page}
              total={pagination.totalData}
              pageSize={10} // adjust to what your API uses
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
