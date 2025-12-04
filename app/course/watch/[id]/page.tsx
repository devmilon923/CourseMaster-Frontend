"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Play, Lock, Upload } from "lucide-react";

interface Module {
  _id: string;
  name: string;
  description: string;
  totalVideoCount: number;
  percentage: number | null;
}

interface Video {
  _id: string;
  moduleId: string;
  name: string;
  description: string;
  videoLink: string;
  isCompleted: boolean;
}

export default function WatchModule() {
  const { id } = useParams(); // this not an video ip please ignore
  const router = useRouter();

  // Static modules data
  const [modules] = useState<Module[]>([
    {
      _id: "692edbe7ec5dfabeed1560f4",
      name: "Orientation",
      description: "This is an normal module description",
      totalVideoCount: 4,
      percentage: 25,
    },
    {
      _id: "692edbe7ec5dfabeed1560f5",
      name: "Getting Started",
      description: "Learn the basics and fundamentals of the course",
      totalVideoCount: 5,
      percentage: 40,
    },
    {
      _id: "692edbe7ec5dfabeed1560f6",
      name: "Advanced Topics",
      description: "Deep dive into advanced concepts and techniques",
      totalVideoCount: 6,
      percentage: 0,
    },
    {
      _id: "692edbe7ec5dfabeed1560f7",
      name: "Project Setup",
      description: "Setting up your development environment",
      totalVideoCount: 3,
      percentage: 66,
    },
  ]);

  // Static videos data
  const [videos] = useState<Video[]>([
    {
      _id: "692edf4eec5dfabeed156116",
      moduleId: "692edbe7ec5dfabeed1560f4",
      name: "Orientation video",
      description: "This is an normal module description",
      videoLink: "https://youtu.be/COFQ-wrn9P4?si=GeY6lOh6vgk0XAJE",
      isCompleted: true,
    },
    {
      _id: "692edf4eec5dfabeed156117",
      moduleId: "692edbe7ec5dfabeed1560f4",
      name: "Course Overview",
      description:
        "Get familiar with the course structure and learning path. This video covers all the fundamentals you need to know to get started.",
      videoLink: "https://youtu.be/S3bg080DKYw?si=Tg98yJw2moE7-81J",
      isCompleted: true,
    },
    {
      _id: "692edf4eec5dfabeed156118",
      moduleId: "692edbe7ec5dfabeed1560f4",
      name: "Requirements and Prerequisites",
      description:
        "Understanding the technical requirements and what you need before starting the course.",
      videoLink: "https://youtu.be/S3bg080DKYw?si=Tg98yJw2moE7-81J",
      isCompleted: true,
    },
    {
      _id: "692edf4eec5dfabeed156119",
      moduleId: "692edbe7ec5dfabeed1560f4",
      name: "Course Resources",
      description:
        "Where to find all course materials, code samples, and documentation.",
      videoLink: "https://youtu.be/S3bg080DKYw?si=Tg98yJw2moE7-81J",
      isCompleted: true,
    },
    {
      _id: "692edf4eec5dfabeed15611a",
      moduleId: "692edbe7ec5dfabeed1560f5",
      name: "Introduction to Core Concepts",
      description:
        "Learn the fundamental concepts that build the foundation of everything else.",
      videoLink: "https://youtu.be/S3bg080DKYw?si=Tg98yJw2moE7-81J",
      isCompleted: true,
    },
  ]);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [selectedModuleId, setSelectedModuleId] = useState(videos[0].moduleId);
  const [assignmentLink, setAssignmentLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate if all videos are completed
  const allVideosCompleted = videos.every((v) => v.isCompleted);

  const handleCompleteVideo = () => {
    // TODO: Update video completion status
    console.log("Video marked as complete:", currentVideo._id);
  };

  const handleVideoSelect = (videoId: string) => {
    const video = videos.find((v) => v._id === videoId);
    if (video) {
      setCurrentVideo(video);
    }
  };

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignmentLink.trim()) {
      console.log("Assignment submitted:", assignmentLink);
      setIsSubmitted(true);
      // TODO: Submit assignment to API
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Course Videos
          </h1>
          <p className="text-sm text-gray-600 mt-1">Video Lesson</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player and Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={(() => {
                  const url = currentVideo.videoLink;
                  if (url.includes("youtu.be/")) {
                    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
                    return `https://www.youtube.com/embed/${videoId}`;
                  } else if (url.includes("youtube.com/watch")) {
                    const videoId = url.split("v=")[1]?.split("&")[0];
                    return `https://www.youtube.com/embed/${videoId}`;
                  }
                  return url;
                })()}
                title={currentVideo.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Title */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {currentVideo.name}
              </h2>
            </div>

            {/* Assignment Submission Section */}
            <div
              className={`rounded-lg border-2 transition-all duration-300 ${
                allVideosCompleted
                  ? "bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200"
                  : "bg-red-50 border-red-100"
              }`}
            >
              {allVideosCompleted ? (
                // Unlocked State
                <div className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Submit Your Assignment
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Great! You've completed all videos. Now submit your
                        assignment link.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleAssignmentSubmit} className="space-y-3">
                    <div>
                      <label
                        htmlFor="assignmentLink"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Assignment Link
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          id="assignmentLink"
                          value={assignmentLink}
                          onChange={(e) => setAssignmentLink(e.target.value)}
                          placeholder="https://github.com/yourname/assignment"
                          disabled={isSubmitted}
                          className={`flex-1 px-4 py-2 rounded-lg border text-sm transition-colors ${
                            isSubmitted
                              ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          }`}
                        />
                        <button
                          type="submit"
                          disabled={isSubmitted || !assignmentLink.trim()}
                          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                            isSubmitted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                          }`}
                        >
                          {isSubmitted ? (
                            <>
                              <CheckCircle2 size={18} />
                              Submitted
                            </>
                          ) : (
                            <>
                              <Upload size={18} />
                              Submit
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                // Locked State
                <div className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-200">
                        <Lock className="h-5 w-5 text-slate-800" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-gray-900">
                        Complete All Videos First
                      </h3>
                      <p className="text-xs text-gray-600 mt-2">
                        Watch and mark all videos as completed to unlock the
                        assignment submission. You've completed{" "}
                        <span className="font-semibold text-blue-600">
                          {videos.filter((v) => v.isCompleted).length}/
                          {videos.length}
                        </span>{" "}
                        videos so far.
                      </p>
                      {/* Progress bar */}
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-red-800 to-green-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (videos.filter((v) => v.isCompleted).length /
                                videos.length) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About this video
              </h3>
              <p className="text-gray-700 leading-relaxed text-xs">
                {currentVideo.description}
              </p>
            </div>
          </div>

          {/* Sidebar - Modules and Videos List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-8">
              {/* Modules Tabs */}
              <div className="border-b border-gray-200  p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Modules
                </h3>
                <div className="space-y-2 py-2 max-h-40 overflow-y-auto">
                  {modules.map((module) => (
                    <div
                      key={module._id}
                      onClick={() => handleModuleSelect(module._id)}
                      className={`px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                        selectedModuleId === module._id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {module.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos List */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Videos
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {videos.map((video) => (
                    <button
                      key={video._id}
                      onClick={() => handleVideoSelect(video._id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                        currentVideo._id === video._id
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {video.isCompleted ? (
                          <CheckCircle2
                            size={16}
                            className="text-green-600 shrink-0 mt-0.5"
                          />
                        ) : (
                          <Play
                            size={16}
                            className="text-gray-400 shrink-0 mt-0.5"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs font-medium truncate ${
                              currentVideo._id === video._id
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {video.name}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
