"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useSendEnrollRequestMutation } from "@/app/redux/api/call/courseApi";

export default function Page() {
  const { id } = useParams();
  const route = useRouter();
  const [sendEnrollRequest, { isLoading }] = useSendEnrollRequestMutation();
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const send = await sendEnrollRequest({ id, note }).unwrap();
    console.log(send);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setNote("");
      route.back();
    }, 2000);
  };

  return (
    <div className="mt-12 flex items-center justify-center ">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-50 p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Enroll Request
            </h1>
            <p className="text-sm text-gray-600">Course ID: {id}</p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Request Sent Successfully!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Note (Optional)
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about your enrollment request..."
                  rows={4}
                  className="w-full px-4 text-sm py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent outline-none resize-none text-gray-800 placeholder-gray-400"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
