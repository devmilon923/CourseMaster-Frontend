import { message, Switch, Button } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { useChangeCourseStatusMutation } from "../redux/api/call/courseApi";
import { Users, BookOpen, Calendar, Edit, Trash2 } from "lucide-react";

export default function AdminCard({ course }: { course: any }) {
  const [changeCourseStatus, {}] = useChangeCourseStatusMutation();
  const [localStatus, setLocalStatus] = useState(course.status || "private");

  const imageBase = process.env.NEXT_PUBLIC_Image_baseURL;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleTogglePublic = async (id: string) => {
    const newStatus = localStatus === "public" ? "private" : "public";
    try {
      const formData = new FormData();
      formData.append("status", newStatus);
      await changeCourseStatus({ id: course?._id, body: formData });
      setLocalStatus(newStatus);
    } catch (error) {
      message.error("Failed to change status");
    }
  };

  const handleEdit = () => {
    // Logic for edit action. E.g., navigate to edit page or open modal
    message.info(`Edit course: ${course.name}`);
  };

  const handleDelete = () => {
    // Logic for delete action. E.g., confirmation modal, API call
    message.warning(`Delete course: ${course.name}`);
  };

  return (
    <div
      key={course._id}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
    >
      <div className="relative h-48">
        <Image
          src={imageBase + course.image}
          alt={course?.name}
          width={400}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {course.name}
          </h3>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Instructor:</span>
            <span>{course.instructor}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Category:</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs">
              {course.category}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.totalEnroll} enrolled</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{course.totalModule} modules</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(course.createdAt)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              ${course.price}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 capitalize font-medium">
                {localStatus}
              </span>
              <Switch
                checked={localStatus === "public"}
                onChange={() => handleTogglePublic(course._id)}
                className={
                  localStatus === "public" ? "bg-green-500!" : "bg-gray-300!"
                }
              />

              <Button
                type="text"
                icon={<Edit className="w-5 h-5 text-blue-600" />}
                onClick={handleEdit}
                title="Edit Course"
              />

              <Button
                type="text"
                icon={<Trash2 className="w-5 h-5 text-red-600" />}
                onClick={handleDelete}
                title="Delete Course"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
