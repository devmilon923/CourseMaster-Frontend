"use client";
import VideoCard from "@/app/components/videoCard";
import { useGetVideosQuery } from "@/app/redux/api/call/courseApi";
import { Button } from "antd";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const { id } = useParams();
  const { data, isLoading } = useGetVideosQuery({ id });
  const route = useRouter();
  return (
    <div className="pt-10">
      <div className="flex justify-end mb-5">
        <Button
          onClick={() => route.push(`/admin/course/videos/add-video/${id}`)}
          type="primary"
          size="large"
          className="bg-black! hover:bg-slate-900!"
        >
          + Add Video
        </Button>
      </div>
      {data?.data
        ? data?.data?.map((video: any) => (
            <VideoCard key={video?._id} videoData={video} />
          ))
        : ""}
    </div>
  );
}
