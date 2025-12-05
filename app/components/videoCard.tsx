"use client";

import React from "react";
import { Button } from "antd";
import {
  Edit,
  Gamepad2Icon,
  ListCheckIcon,
  ListChecks,
  ShieldQuestion,
  TestTube,
} from "lucide-react"; // quiz icon
import { useRouter } from "next/navigation";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getYoutubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }
    const parts = u.pathname.split("/");
    const embedIndex = parts.findIndex((p) => p === "embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      return parts[embedIndex + 1];
    }
    return null;
  } catch {
    return null;
  }
};

export default function VideoCard({ videoData }: { videoData: any }) {
  const videoId = getYoutubeId(videoData.videoLink);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : undefined;
  const route = useRouter();

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        {/* Header: title + order + actions */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Module Video #{videoData.orderBy}
            </p>
            <h2 className="text-lg font-semibold text-gray-900">
              {videoData.name}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            {/* Quiz button */}
            <Button
              onClick={() =>
                route.push(
                  `/admin/course/videos/${videoData?._id}/quiz` // adjust path as you like
                )
              }
              type="text"
              size="small"
              className="flex items-center"
              title="Manage quiz"
            >
              <ListCheckIcon className="w-5 h-5 text-green-500" />
            </Button>

            {/* Edit button */}
            <Button
              onClick={() =>
                route.push(`/admin/course/videos/edit-video/${videoData?._id}`)
              }
              type="text"
              size="small"
              className="flex items-center"
              title="Edit video"
            >
              <Edit className="w-5 h-5 text-yellow-500" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{videoData.description}</p>

        {/* Embedded YouTube video */}
        {embedUrl ? (
          <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
            <iframe
              src={embedUrl}
              title={videoData.name}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="text-xs text-red-500">
            Invalid YouTube link: {videoData.videoLink}
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Created at: <strong>{formatDate(videoData.createdAt)}</strong>
          </span>
          <span className="truncate max-w-xs">
            Video link:{" "}
            <a
              href={videoData.videoLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {videoData.videoLink}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
