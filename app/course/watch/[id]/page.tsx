"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Play,
  Lock,
  Upload,
  Clock,
  AlertCircle,
  Calendar,
} from "lucide-react";
import {
  useAssignmentCheckQuery,
  useGetCourseModuleQuery,
  useGetModuleVideosQuery,
  useMarkAssignmentCompletedMutation,
  useMarkVideoAsCompletedMutation,
} from "@/app/redux/api/call/courseApi";

export default function WatchModule() {
  const { id } = useParams();
  const router = useRouter();

  const { data: getModules, isLoading: moduleGetLoading } =
    useGetCourseModuleQuery({ id });

  const [videos, setVideos] = useState<any>([]);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const { data: isCompletedAssignment } = useAssignmentCheckQuery({
    id: selectedModuleId,
  });
  const [assignmentLink, setAssignmentLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modules, setModules] = useState([]);
  const [markVideoAsCompleted, { isLoading: videoCompleteLoading }] =
    useMarkVideoAsCompletedMutation();
  const [markAssignmentCompleted, { isLoading: assignmentCompleteLoading }] =
    useMarkAssignmentCompletedMutation();
  const { data: getVideos, isLoading: videoGetLoading } =
    useGetModuleVideosQuery({ id: selectedModuleId });
  useEffect(() => {
    if (id && getModules?.data) {
      setModules(getModules?.data);
    }
  }, [id, moduleGetLoading]);
  useEffect(() => {
    if (getVideos?.data) {
      setVideos(getVideos?.data);
    }
  }, [id, videoGetLoading, getVideos]);
  const allVideosCompleted = videos.every((v: any) => v.isCompleted);
  const handleCompleteVideo = async () => {
    try {
      const completeReq = await markVideoAsCompleted({ id: currentVideo?._id });
      setCurrentVideo({ ...currentVideo, isCompleted: true });
    } catch (error) {}
    console.log("Video marked as complete:", currentVideo?._id);
  };

  const handleVideoSelect = (videoId: string) => {
    const video = videos.find((v: any) => v._id === videoId);
    if (video) {
      setCurrentVideo(video);
    }
  };

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId);
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (assignmentLink.trim()) {
      try {
        const submitRequest = await markAssignmentCompleted({
          id: selectedModuleId,
          link: assignmentLink,
        }).unwrap();
        if (submitRequest?.success) {
          router.push(`/course/module/quiz/${selectedModuleId}`);
        }
      } catch (error) {}
      console.log("Assignment submitted:", assignmentLink);
      setIsSubmitted(true);
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
                  const url = currentVideo?.videoLink;
                  if (url?.includes("youtu.be/")) {
                    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
                    return `https://www.youtube.com/embed/${videoId}`;
                  } else if (url?.includes("youtube.com/watch")) {
                    const videoId = url?.split("v=")[1]?.split("&")[0];
                    return `https://www.youtube.com/embed/${videoId}`;
                  }
                  return url;
                })()}
                title={currentVideo?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Title */}
            <div className="flex md:items-center text-start items-center gap-4 flex-col md:flex-row md:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-center md:text-start text-gray-900">
                  {currentVideo?.name}
                </h2>
                <div className="bg-white rounded-lg flex border-gray-200">
                  <p className="text-gray-700 text-center md:text-start leading-relaxed text-xs">
                    {currentVideo?.description}
                  </p>
                </div>
              </div>

              {!currentVideo?.isCompleted && currentVideo && (
                <button
                  onClick={handleCompleteVideo}
                  className="w-fit cursor-pointer flex text-sm items-center justify-center gap-2 px-6 py-3  bg-linear-to-r bg-green-600 text-white rounded-full font-medium hover:bg-green-700 active:scale-95 transition-all shadow-sm hover:shadow-md"
                >
                  <Play size={15} />
                  <span>Mark as Complete</span>
                </button>
              )}
            </div>
            {allVideosCompleted && videos?.length !== 0 && (
              <div
                className={`rounded-lg border-2 transition-all duration-300 ${
                  allVideosCompleted
                    ? "bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200"
                    : "bg-red-50 border-red-100"
                }`}
              >
                {allVideosCompleted ? (
                  <div className="p-6">
                    {/* Already Submitted State */}
                    {isCompletedAssignment?.data?.isSubmitted ? (
                      <div>
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="shrink-0">
                            <div
                              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                                isCompletedAssignment?.data?.status ===
                                "accepted"
                                  ? "bg-green-100"
                                  : "bg-yellow-100"
                              }`}
                            >
                              {isCompletedAssignment?.data?.status ===
                              "accepted" ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                              ) : (
                                <Clock className="h-6 w-6 text-yellow-600" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {isCompletedAssignment?.data?.status ===
                              "accepted"
                                ? "Assignment Accepted! 🎉"
                                : "Assignment Under Review"}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {isCompletedAssignment?.data?.status ===
                              "accepted"
                                ? "Your assignment has been reviewed and accepted. Great work!"
                                : "Your assignment has been submitted and is pending review. We'll get back to you soon."}
                            </p>
                            {isCompletedAssignment?.data?.submittedAt && (
                              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                <Calendar size={14} />
                                <span>
                                  Submitted on{" "}
                                  {new Date(
                                    isCompletedAssignment.data.submittedAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {isCompletedAssignment?.data?.status === "pending" && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                            <div className="flex items-start gap-3">
                              <Clock
                                size={18}
                                className="text-yellow-600 shrink-0 mt-0.5"
                              />
                              <div>
                                <p className="text-sm font-medium text-yellow-900">
                                  Status: Pending Review
                                </p>
                                <p className="text-xs text-yellow-700 mt-1">
                                  Your submission is in the queue for instructor
                                  review. You'll receive feedback once it's been
                                  evaluated.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Submit State
                      <div>
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
                              Great! You've completed all videos. Now submit
                              your assignment link.
                            </p>
                          </div>
                        </div>

                        <form
                          onSubmit={handleAssignmentSubmit}
                          className="space-y-3"
                        >
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
                                onChange={(e) =>
                                  setAssignmentLink(e.target.value)
                                }
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
                    )}
                  </div>
                ) : (
                  currentVideo && (
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
                              {videos.filter((v: any) => v.isCompleted).length}/
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
                                  (videos.filter((v: any) => v.isCompleted)
                                    .length /
                                    videos.length) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
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
                  {modules?.length ? (
                    modules.map((module: any) => (
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
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">
                      No module found
                    </span>
                  )}
                </div>
              </div>

              {/* Videos List */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Videos
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {videos?.length ? (
                    videos.map((video: any) => (
                      <button
                        key={video._id}
                        onClick={() => handleVideoSelect(video?._id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                          currentVideo?._id === video?._id
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {video.isCompleted ? (
                            <CheckCircle2
                              size={16}
                              className="text-green-600 shrink-0"
                            />
                          ) : (
                            <Play
                              size={16}
                              className="text-gray-400 shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-xs font-medium truncate ${
                                currentVideo?._id === video._id
                                  ? "text-blue-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {video.name}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">
                      No video found
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
