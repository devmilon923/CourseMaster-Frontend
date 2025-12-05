"use client";
import ModuleCard from "@/app/components/moduleCard";
import { useGetModulesQuery } from "@/app/redux/api/call/courseApi";
import { Button } from "antd";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetModulesQuery(id);
  return (
    <div className="pt-10">
      <div className="flex justify-end mb-5">
        <Button
          onClick={() => route.push(`/admin/course/module/add-module/${id}`)}
          type="primary"
          size="large"
          className="bg-black! hover:bg-slate-900!"
        >
          + Add Module
        </Button>
      </div>
      {data?.data ? (
        data?.data?.map((module: any) => (
          <ModuleCard key={module?._id} fetched={module} />
        ))
      ) : (
        <span>No module found</span>
      )}
    </div>
  );
}
