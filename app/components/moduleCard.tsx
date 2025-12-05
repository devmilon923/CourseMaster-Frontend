"use client";

import { useState, useEffect } from "react";
import { Switch, Tag, Button } from "antd";
import { Edit } from "lucide-react"; // or any icon library you use
import { useRouter } from "next/navigation";
import { useEditModuleAdminDetailsMutation } from "../redux/api/call/courseApi";

type ModuleType = {
  _id: string;
  name: string;
  description: string;
  course: string;
  orderBy: number;
  createdAt: string;
  status: "public" | "private";
  totalVideoCount: number;
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function ModuleCard({
  fetched,
}: {
  fetched: ModuleType | null;
}) {
  const [module, setModule] = useState<ModuleType | null>(fetched);
  const [editModuleAdminDetails, { isLoading }] =
    useEditModuleAdminDetailsMutation();
  const [status, setStatus] = useState<"public" | "private">("private");
  const route = useRouter();
  // keep local status in sync with fetched
  useEffect(() => {
    if (fetched) {
      setModule(fetched);
      setStatus(fetched.status);
    }
  }, [fetched]);

  const handleToggleStatus = async () => {
    if (!module) return;
    const newStatus = status === "public" ? "private" : "public";
    setStatus(newStatus);
    try {
      await editModuleAdminDetails({
        id: fetched?._id,
        body: { status: newStatus },
      });
    } catch (e) {
      setStatus(status === "public" ? "private" : "public");
    }
  };

  const handleEdit = () => {
    route.push(`/admin/course/module/edit-module/${module?._id}`);
  };

  if (!module) return <div className="p-6">Loading module...</div>;

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">{module.name}</h1>

          <div className="flex items-center gap-2">
            {/* Edit icon button */}
            <Button
              type="text"
              size="small"
              onClick={handleEdit}
              title="Edit module"
              className="flex items-center"
            >
              <Edit className="w-4 h-4 text-yellow-600" />
            </Button>

            <Tag
              color={status === "public" ? "green" : "red"}
              className="capitalize"
            >
              {status}
            </Tag>
            <Switch
              checked={status === "public"}
              onChange={handleToggleStatus}
              className={status === "public" ? "bg-green-500!" : "bg-gray-300!"}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">{module.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Order</p>
            <p>#{module.orderBy}</p>
          </div>
          <div>
            <p className="font-medium">Total videos</p>
            <p>{module.totalVideoCount}</p>
          </div>
          <div>
            <p className="font-medium">Created at</p>
            <p>{formatDate(module.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
